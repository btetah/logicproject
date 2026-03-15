/* ============================================
   Main - Application Entry Point
   ============================================ */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var trainerKit = document.getElementById('trainer-kit');
        var powerSwitch = document.getElementById('power-switch');
        var powerLed = document.getElementById('power-led');
        var switchesContainer = document.getElementById('switches-container');
        var ledsContainer = document.getElementById('leds-container');
        var icLibraryContainer = document.getElementById('ic-library');
        var bbGrid = document.getElementById('bb-main-grid');
        var topVccRail = document.getElementById('top-vcc-rail');
        var topGndRail = document.getElementById('top-gnd-rail');
        var bottomVccRail = document.getElementById('bottom-vcc-rail');
        var bottomGndRail = document.getElementById('bottom-gnd-rail');
        var clockEnable = document.getElementById('clock-enable');
        var freqDisplay = document.getElementById('freq-display');
        var pulserLHBtn = document.getElementById('pulser-lh-btn');
        var pulserHLBtn = document.getElementById('pulser-hl-btn');
        var probeInput = document.getElementById('probe-input');
        var probeHighLed = document.getElementById('probe-high-led');
        var probeLowLed = document.getElementById('probe-low-led');
        var probeTriLed = document.getElementById('probe-tri-led');
        var btnWire = document.getElementById('btn-wire');
        var btnDeleteWire = document.getElementById('btn-delete-wire');
        var btnClearWires = document.getElementById('btn-clear-wires');
        var btnRemoveIC = document.getElementById('btn-remove-ic');
        var btnReset = document.getElementById('btn-reset');
        var wireModeIndicator = document.getElementById('wire-mode-indicator');
        var statusMsg = document.getElementById('status-msg');

        // DTK02 fixed clock frequencies
        var freqSteps = [1, 10, 100, 1000, 10000, 100000, 1000000];
        var currentFreqIndex = 0;

        // Initialize components
        Components.initSwitches(switchesContainer, function() {
            Simulator.simulate();
        });

        Components.initLEDs(ledsContainer);

        // Initialize breadboard
        Breadboard.init(bbGrid, topVccRail, topGndRail, bottomVccRail, bottomGndRail);

        // Initialize IC library
        Components.initICLibrary(icLibraryContainer, function(icName) {
            if (!Simulator.isPowerOn()) {
                setStatus('Turn on the power first!');
                return;
            }
            var icDef = ICLibrary[icName];
            var pinsPerSide = icDef.pins / 2;
            var row = Breadboard.findNextAvailableRow(pinsPerSide);
            if (row === -1) {
                setStatus('No space on breadboard for ' + icName);
                return;
            }
            Breadboard.placeIC(icName, row);
            Simulator.simulate();
        });

        // Initialize external connection points (switches, LEDs)
        setTimeout(function() {
            Breadboard.initExternalPoints();
        }, 100);

        // Power switch
        powerSwitch.addEventListener('click', function() {
            var newState = powerSwitch.getAttribute('data-state') === 'off' ? 'on' : 'off';
            powerSwitch.setAttribute('data-state', newState);

            if (newState === 'on') {
                powerLed.classList.add('on');
                trainerKit.classList.remove('powered-off');
                Simulator.setPower(true);
                setStatus('Power ON - System ready (+5V, ±12V active)');
                powerSwitch.querySelector('.state-label').textContent = 'ON';
            } else {
                powerLed.classList.remove('on');
                trainerKit.classList.add('powered-off');
                Simulator.setPower(false);
                setStatus('Power OFF - Turn on the power switch to begin');
                powerSwitch.querySelector('.state-label').textContent = 'OFF';

                // Disable clock toggle
                clockEnable.setAttribute('data-state', 'off');
                // Reset probe LEDs
                updateProbeLEDs(-1);
            }
        });

        // Clock enable toggle
        clockEnable.addEventListener('click', function() {
            if (!Simulator.isPowerOn()) return;

            var newState = clockEnable.getAttribute('data-state') === 'off' ? 'on' : 'off';
            clockEnable.setAttribute('data-state', newState);

            if (newState === 'on') {
                var freq = freqSteps[currentFreqIndex];
                Simulator.setClockFrequency(freq);
                Simulator.startClock();
            } else {
                Simulator.stopClock();
            }
        });

        // Frequency selection buttons
        var freqButtons = document.querySelectorAll('.freq-btn');
        for (var fi = 0; fi < freqButtons.length; fi++) {
            (function(btn) {
                btn.addEventListener('click', function() {
                    if (!Simulator.isPowerOn()) return;
                    var freq = parseInt(btn.getAttribute('data-freq'));
                    currentFreqIndex = freqSteps.indexOf(freq);

                    // Update active button
                    var allBtns = document.querySelectorAll('.freq-btn');
                    for (var b = 0; b < allBtns.length; b++) {
                        allBtns[b].classList.remove('active');
                    }
                    btn.classList.add('active');

                    var label = formatFrequency(freq);
                    freqDisplay.textContent = label;

                    if (clockEnable.getAttribute('data-state') === 'on') {
                        Simulator.setClockFrequency(freq);
                        Simulator.startClock();
                    }
                });
            })(freqButtons[fi]);
        }

        // Pulser buttons - L→H and H→L transitions
        pulserLHBtn.addEventListener('click', function() {
            if (!Simulator.isPowerOn()) return;
            Simulator.pulse();
        });

        pulserHLBtn.addEventListener('click', function() {
            if (!Simulator.isPowerOn()) return;
            Simulator.pulseHigh();
        });

        // Logic probe input - listen for connection point clicks
        if (probeInput) {
            probeInput.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!Simulator.isPowerOn()) return;
                setStatus('PROBE MODE: Click a connection point to probe its logic level');
                // Activate probe mode
                document.body.classList.add('probe-mode');
                var probeHandler = function(ev) {
                    var conn = ev.target.getAttribute('data-conn');
                    if (conn) {
                        var value = Simulator.probeValue(conn);
                        updateProbeLEDs(value);
                        setStatus('Probe: ' + conn + ' = ' + (value === -1 ? 'TRI-STATE' : (value ? 'HIGH' : 'LOW')));
                    }
                    document.body.classList.remove('probe-mode');
                    document.removeEventListener('click', probeHandler);
                };
                setTimeout(function() {
                    document.addEventListener('click', probeHandler);
                }, 50);
            });
        }

        // Wire tool
        btnWire.addEventListener('click', function() {
            if (!Simulator.isPowerOn()) return;
            var isActive = btnWire.classList.contains('active');
            deactivateTools();
            if (!isActive) {
                btnWire.classList.add('active');
                Breadboard.setWireMode(true);
                wireModeIndicator.classList.remove('hidden');
                setStatus('WIRE MODE: Click two points to create a wire connection');
            }
        });

        // Delete wire tool
        btnDeleteWire.addEventListener('click', function() {
            if (!Simulator.isPowerOn()) return;
            var isActive = btnDeleteWire.classList.contains('active');
            deactivateTools();
            if (!isActive) {
                btnDeleteWire.classList.add('active');
                Breadboard.setDeleteWireMode(true);
                setStatus('DELETE WIRE MODE: Click a wire or hole to remove connections');
            }
        });

        // Clear wires
        btnClearWires.addEventListener('click', function() {
            if (!Simulator.isPowerOn()) return;
            Breadboard.clearAllWires();
            Simulator.simulate();
            setStatus('All wires cleared');
        });

        // Remove IC
        btnRemoveIC.addEventListener('click', function() {
            if (!Simulator.isPowerOn()) return;
            Breadboard.removeLastIC();
            Simulator.simulate();
        });

        // Reset all
        btnReset.addEventListener('click', function() {
            Breadboard.resetAll();
            Components.resetSwitches();
            Components.resetLEDs();
            Components.clearSevenSegments();
            Simulator.stopClock();
            Simulator.setPower(false);

            // Reset power switch
            powerSwitch.setAttribute('data-state', 'off');
            powerSwitch.querySelector('.state-label').textContent = 'OFF';
            powerLed.classList.remove('on');
            trainerKit.classList.add('powered-off');

            // Reset clock
            clockEnable.setAttribute('data-state', 'off');
            currentFreqIndex = 0;
            freqDisplay.textContent = '1 Hz';

            // Reset frequency buttons
            var allFreqBtns = document.querySelectorAll('.freq-btn');
            for (var fb = 0; fb < allFreqBtns.length; fb++) {
                allFreqBtns[fb].classList.remove('active');
            }
            if (allFreqBtns.length > 0) allFreqBtns[0].classList.add('active');

            // Reset probe
            updateProbeLEDs(-1);

            deactivateTools();
            setStatus('System reset complete');
        });

        function deactivateTools() {
            btnWire.classList.remove('active');
            btnDeleteWire.classList.remove('active');
            Breadboard.setWireMode(false);
            Breadboard.setDeleteWireMode(false);
            wireModeIndicator.classList.add('hidden');
        }

        function setStatus(msg) {
            statusMsg.textContent = msg;
        }

        function formatFrequency(freq) {
            if (freq >= 1000000) return (freq / 1000000) + ' MHz';
            if (freq >= 1000) return (freq / 1000) + ' kHz';
            return freq + ' Hz';
        }

        function updateProbeLEDs(value) {
            if (!probeHighLed || !probeLowLed || !probeTriLed) return;
            probeHighLed.classList.remove('on');
            probeLowLed.classList.remove('on');
            probeTriLed.classList.remove('on');
            if (value === 1) {
                probeHighLed.classList.add('on');
            } else if (value === 0) {
                probeLowLed.classList.add('on');
            } else {
                probeTriLed.classList.add('on');
            }
        }

        // Handle window resize - redraw wires
        window.addEventListener('resize', function() {
            Breadboard.redrawAllWires();
        });

        // Periodic simulation for real-time updates
        setInterval(function() {
            if (Simulator.isPowerOn()) {
                Simulator.simulate();
            }
        }, 100);
    });
})();
