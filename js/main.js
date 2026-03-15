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
        var clockFreqSlider = document.getElementById('clock-freq');
        var freqDisplay = document.getElementById('freq-display');
        var pulserBtn = document.getElementById('pulser-btn');
        var btnWire = document.getElementById('btn-wire');
        var btnDeleteWire = document.getElementById('btn-delete-wire');
        var btnClearWires = document.getElementById('btn-clear-wires');
        var btnRemoveIC = document.getElementById('btn-remove-ic');
        var btnReset = document.getElementById('btn-reset');
        var wireModeIndicator = document.getElementById('wire-mode-indicator');
        var statusMsg = document.getElementById('status-msg');

        // Frequency steps
        var freqSteps = [1, 10, 100, 1000];

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
                setStatus('Power ON - System ready');
                powerSwitch.querySelector('.state-label').textContent = 'ON';
            } else {
                powerLed.classList.remove('on');
                trainerKit.classList.add('powered-off');
                Simulator.setPower(false);
                setStatus('Power OFF - Turn on the power switch to begin');
                powerSwitch.querySelector('.state-label').textContent = 'OFF';

                // Disable clock toggle
                clockEnable.setAttribute('data-state', 'off');
            }
        });

        // Clock enable toggle
        clockEnable.addEventListener('click', function() {
            if (!Simulator.isPowerOn()) return;

            var newState = clockEnable.getAttribute('data-state') === 'off' ? 'on' : 'off';
            clockEnable.setAttribute('data-state', newState);

            if (newState === 'on') {
                var freq = freqSteps[parseInt(clockFreqSlider.value)];
                Simulator.setClockFrequency(freq);
                Simulator.startClock();
            } else {
                Simulator.stopClock();
            }
        });

        // Clock frequency slider
        clockFreqSlider.addEventListener('input', function() {
            var freq = freqSteps[parseInt(this.value)];
            var label = freq >= 1000 ? (freq / 1000) + ' kHz' : freq + ' Hz';
            freqDisplay.textContent = label;
            if (clockEnable.getAttribute('data-state') === 'on') {
                Simulator.setClockFrequency(freq);
                Simulator.startClock();
            }
        });

        // Pulser button
        pulserBtn.addEventListener('click', function() {
            if (!Simulator.isPowerOn()) return;
            Simulator.pulse();
        });

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
            clockFreqSlider.value = 1;
            freqDisplay.textContent = '10 Hz';

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
