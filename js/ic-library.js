/* ============================================
   IC Library - 74xx Series IC Definitions
   ============================================ */

/**
 * Each IC definition includes:
 * - name: IC part number
 * - description: Brief description
 * - pins: Number of pins (14 or 16)
 * - pinout: Array describing each pin's function
 * - simulate: Function that computes outputs from inputs
 */

// eslint-disable-next-line no-unused-vars
var ICLibrary = {

    /* 7400 - Quad 2-Input NAND Gate */
    '7400': {
        name: '7400',
        description: 'Quad 2-Input NAND',
        pins: 14,
        pinout: [
            { pin: 1,  name: '1A',  type: 'input' },
            { pin: 2,  name: '1B',  type: 'input' },
            { pin: 3,  name: '1Y',  type: 'output' },
            { pin: 4,  name: '2A',  type: 'input' },
            { pin: 5,  name: '2B',  type: 'input' },
            { pin: 6,  name: '2Y',  type: 'output' },
            { pin: 7,  name: 'GND', type: 'power' },
            { pin: 8,  name: '3Y',  type: 'output' },
            { pin: 9,  name: '3A',  type: 'input' },
            { pin: 10, name: '3B',  type: 'input' },
            { pin: 11, name: '4Y',  type: 'output' },
            { pin: 12, name: '4A',  type: 'input' },
            { pin: 13, name: '4B',  type: 'input' },
            { pin: 14, name: 'VCC', type: 'power' }
        ],
        simulate: function(pins) {
            pins[3]  = (pins[1] && pins[2]) ? 0 : 1;   // 1Y = NAND(1A,1B)
            pins[6]  = (pins[4] && pins[5]) ? 0 : 1;   // 2Y = NAND(2A,2B)
            pins[8]  = (pins[9] && pins[10]) ? 0 : 1;  // 3Y = NAND(3A,3B)
            pins[11] = (pins[12] && pins[13]) ? 0 : 1;  // 4Y = NAND(4A,4B)
            return pins;
        }
    },

    /* 7402 - Quad 2-Input NOR Gate */
    '7402': {
        name: '7402',
        description: 'Quad 2-Input NOR',
        pins: 14,
        pinout: [
            { pin: 1,  name: '1Y',  type: 'output' },
            { pin: 2,  name: '1A',  type: 'input' },
            { pin: 3,  name: '1B',  type: 'input' },
            { pin: 4,  name: '2Y',  type: 'output' },
            { pin: 5,  name: '2A',  type: 'input' },
            { pin: 6,  name: '2B',  type: 'input' },
            { pin: 7,  name: 'GND', type: 'power' },
            { pin: 8,  name: '3A',  type: 'input' },
            { pin: 9,  name: '3B',  type: 'input' },
            { pin: 10, name: '3Y',  type: 'output' },
            { pin: 11, name: '4A',  type: 'input' },
            { pin: 12, name: '4B',  type: 'input' },
            { pin: 13, name: '4Y',  type: 'output' },
            { pin: 14, name: 'VCC', type: 'power' }
        ],
        simulate: function(pins) {
            pins[1]  = (pins[2] || pins[3]) ? 0 : 1;    // 1Y = NOR(1A,1B)
            pins[4]  = (pins[5] || pins[6]) ? 0 : 1;    // 2Y = NOR(2A,2B)
            pins[10] = (pins[8] || pins[9]) ? 0 : 1;    // 3Y = NOR(3A,3B)
            pins[13] = (pins[11] || pins[12]) ? 0 : 1;  // 4Y = NOR(4A,4B)
            return pins;
        }
    },

    /* 7404 - Hex Inverter (NOT) */
    '7404': {
        name: '7404',
        description: 'Hex Inverter (NOT)',
        pins: 14,
        pinout: [
            { pin: 1,  name: '1A',  type: 'input' },
            { pin: 2,  name: '1Y',  type: 'output' },
            { pin: 3,  name: '2A',  type: 'input' },
            { pin: 4,  name: '2Y',  type: 'output' },
            { pin: 5,  name: '3A',  type: 'input' },
            { pin: 6,  name: '3Y',  type: 'output' },
            { pin: 7,  name: 'GND', type: 'power' },
            { pin: 8,  name: '4Y',  type: 'output' },
            { pin: 9,  name: '4A',  type: 'input' },
            { pin: 10, name: '5Y',  type: 'output' },
            { pin: 11, name: '5A',  type: 'input' },
            { pin: 12, name: '6Y',  type: 'output' },
            { pin: 13, name: '6A',  type: 'input' },
            { pin: 14, name: 'VCC', type: 'power' }
        ],
        simulate: function(pins) {
            pins[2]  = pins[1] ? 0 : 1;    // 1Y = NOT(1A)
            pins[4]  = pins[3] ? 0 : 1;    // 2Y = NOT(2A)
            pins[6]  = pins[5] ? 0 : 1;    // 3Y = NOT(3A)
            pins[8]  = pins[9] ? 0 : 1;    // 4Y = NOT(4A)
            pins[10] = pins[11] ? 0 : 1;   // 5Y = NOT(5A)
            pins[12] = pins[13] ? 0 : 1;   // 6Y = NOT(6A)
            return pins;
        }
    },

    /* 7408 - Quad 2-Input AND Gate */
    '7408': {
        name: '7408',
        description: 'Quad 2-Input AND',
        pins: 14,
        pinout: [
            { pin: 1,  name: '1A',  type: 'input' },
            { pin: 2,  name: '1B',  type: 'input' },
            { pin: 3,  name: '1Y',  type: 'output' },
            { pin: 4,  name: '2A',  type: 'input' },
            { pin: 5,  name: '2B',  type: 'input' },
            { pin: 6,  name: '2Y',  type: 'output' },
            { pin: 7,  name: 'GND', type: 'power' },
            { pin: 8,  name: '3Y',  type: 'output' },
            { pin: 9,  name: '3A',  type: 'input' },
            { pin: 10, name: '3B',  type: 'input' },
            { pin: 11, name: '4Y',  type: 'output' },
            { pin: 12, name: '4A',  type: 'input' },
            { pin: 13, name: '4B',  type: 'input' },
            { pin: 14, name: 'VCC', type: 'power' }
        ],
        simulate: function(pins) {
            pins[3]  = (pins[1] && pins[2]) ? 1 : 0;   // 1Y = AND(1A,1B)
            pins[6]  = (pins[4] && pins[5]) ? 1 : 0;   // 2Y = AND(2A,2B)
            pins[8]  = (pins[9] && pins[10]) ? 1 : 0;  // 3Y = AND(3A,3B)
            pins[11] = (pins[12] && pins[13]) ? 1 : 0;  // 4Y = AND(4A,4B)
            return pins;
        }
    },

    /* 7432 - Quad 2-Input OR Gate */
    '7432': {
        name: '7432',
        description: 'Quad 2-Input OR',
        pins: 14,
        pinout: [
            { pin: 1,  name: '1A',  type: 'input' },
            { pin: 2,  name: '1B',  type: 'input' },
            { pin: 3,  name: '1Y',  type: 'output' },
            { pin: 4,  name: '2A',  type: 'input' },
            { pin: 5,  name: '2B',  type: 'input' },
            { pin: 6,  name: '2Y',  type: 'output' },
            { pin: 7,  name: 'GND', type: 'power' },
            { pin: 8,  name: '3Y',  type: 'output' },
            { pin: 9,  name: '3A',  type: 'input' },
            { pin: 10, name: '3B',  type: 'input' },
            { pin: 11, name: '4Y',  type: 'output' },
            { pin: 12, name: '4A',  type: 'input' },
            { pin: 13, name: '4B',  type: 'input' },
            { pin: 14, name: 'VCC', type: 'power' }
        ],
        simulate: function(pins) {
            pins[3]  = (pins[1] || pins[2]) ? 1 : 0;   // 1Y = OR(1A,1B)
            pins[6]  = (pins[4] || pins[5]) ? 1 : 0;   // 2Y = OR(2A,2B)
            pins[8]  = (pins[9] || pins[10]) ? 1 : 0;  // 3Y = OR(3A,3B)
            pins[11] = (pins[12] || pins[13]) ? 1 : 0;  // 4Y = OR(4A,4B)
            return pins;
        }
    },

    /* 7486 - Quad 2-Input XOR Gate */
    '7486': {
        name: '7486',
        description: 'Quad 2-Input XOR',
        pins: 14,
        pinout: [
            { pin: 1,  name: '1A',  type: 'input' },
            { pin: 2,  name: '1B',  type: 'input' },
            { pin: 3,  name: '1Y',  type: 'output' },
            { pin: 4,  name: '2A',  type: 'input' },
            { pin: 5,  name: '2B',  type: 'input' },
            { pin: 6,  name: '2Y',  type: 'output' },
            { pin: 7,  name: 'GND', type: 'power' },
            { pin: 8,  name: '3Y',  type: 'output' },
            { pin: 9,  name: '3A',  type: 'input' },
            { pin: 10, name: '3B',  type: 'input' },
            { pin: 11, name: '4Y',  type: 'output' },
            { pin: 12, name: '4A',  type: 'input' },
            { pin: 13, name: '4B',  type: 'input' },
            { pin: 14, name: 'VCC', type: 'power' }
        ],
        simulate: function(pins) {
            pins[3]  = (pins[1] ^ pins[2]) ? 1 : 0;    // 1Y = XOR(1A,1B)
            pins[6]  = (pins[4] ^ pins[5]) ? 1 : 0;    // 2Y = XOR(2A,2B)
            pins[8]  = (pins[9] ^ pins[10]) ? 1 : 0;   // 3Y = XOR(3A,3B)
            pins[11] = (pins[12] ^ pins[13]) ? 1 : 0;   // 4Y = XOR(4A,4B)
            return pins;
        }
    },

    /* 7447 - BCD to 7-Segment Decoder */
    '7447': {
        name: '7447',
        description: 'BCD to 7-Seg Decoder',
        pins: 16,
        pinout: [
            { pin: 1,  name: 'B',     type: 'input' },
            { pin: 2,  name: 'C',     type: 'input' },
            { pin: 3,  name: 'LT',    type: 'input' },
            { pin: 4,  name: 'BI/RBO',type: 'input' },
            { pin: 5,  name: 'RBI',   type: 'input' },
            { pin: 6,  name: 'D',     type: 'input' },
            { pin: 7,  name: 'A',     type: 'input' },
            { pin: 8,  name: 'GND',   type: 'power' },
            { pin: 9,  name: 'e',     type: 'output' },
            { pin: 10, name: 'd',     type: 'output' },
            { pin: 11, name: 'c',     type: 'output' },
            { pin: 12, name: 'b',     type: 'output' },
            { pin: 13, name: 'a',     type: 'output' },
            { pin: 14, name: 'g',     type: 'output' },
            { pin: 15, name: 'f',     type: 'output' },
            { pin: 16, name: 'VCC',   type: 'power' }
        ],
        simulate: function(pins) {
            // BCD inputs: A(pin7), B(pin1), C(pin2), D(pin6)
            var bcd = (pins[7] ? 1 : 0) |
                      ((pins[1] ? 1 : 0) << 1) |
                      ((pins[2] ? 1 : 0) << 2) |
                      ((pins[6] ? 1 : 0) << 3);

            // 7447 outputs are active LOW (0 = segment ON)
            // segments: a(13), b(12), c(11), d(10), e(9), f(15), g(14)
            var segTable = [
                // a  b  c  d  e  f  g   for digits 0-9
                [0, 0, 0, 0, 0, 0, 1],  // 0
                [1, 0, 0, 1, 1, 1, 1],  // 1
                [0, 0, 1, 0, 0, 1, 0],  // 2
                [0, 0, 0, 0, 1, 1, 0],  // 3
                [1, 0, 0, 1, 1, 0, 0],  // 4
                [0, 1, 0, 0, 1, 0, 0],  // 5
                [0, 1, 0, 0, 0, 0, 0],  // 6
                [0, 0, 0, 1, 1, 1, 1],  // 7
                [0, 0, 0, 0, 0, 0, 0],  // 8
                [0, 0, 0, 0, 1, 0, 0],  // 9
                [1, 1, 1, 0, 0, 1, 0],  // 10 (invalid)
                [1, 1, 0, 0, 1, 1, 0],  // 11 (invalid)
                [1, 0, 1, 1, 1, 0, 0],  // 12 (invalid)
                [0, 1, 1, 0, 1, 0, 0],  // 13 (invalid)
                [1, 1, 1, 0, 0, 0, 0],  // 14 (invalid)
                [1, 1, 1, 1, 1, 1, 1]   // 15 (blank)
            ];

            var seg = segTable[bcd] || segTable[15];

            // Active LOW: 0 means segment on, we invert for our simulation (1=on)
            pins[13] = seg[0] ? 0 : 1;  // a
            pins[12] = seg[1] ? 0 : 1;  // b
            pins[11] = seg[2] ? 0 : 1;  // c
            pins[10] = seg[3] ? 0 : 1;  // d
            pins[9]  = seg[4] ? 0 : 1;  // e
            pins[15] = seg[5] ? 0 : 1;  // f
            pins[14] = seg[6] ? 0 : 1;  // g

            return pins;
        }
    },

    /* 7474 - Dual D Flip-Flop with Preset and Clear */
    '7474': {
        name: '7474',
        description: 'Dual D Flip-Flop',
        pins: 14,
        pinout: [
            { pin: 1,  name: '1CLR', type: 'input' },
            { pin: 2,  name: '1D',   type: 'input' },
            { pin: 3,  name: '1CLK', type: 'input' },
            { pin: 4,  name: '1PRE', type: 'input' },
            { pin: 5,  name: '1Q',   type: 'output' },
            { pin: 6,  name: '1Q\'', type: 'output' },
            { pin: 7,  name: 'GND',  type: 'power' },
            { pin: 8,  name: '2Q\'', type: 'output' },
            { pin: 9,  name: '2Q',   type: 'output' },
            { pin: 10, name: '2PRE', type: 'input' },
            { pin: 11, name: '2CLK', type: 'input' },
            { pin: 12, name: '2D',   type: 'input' },
            { pin: 13, name: '2CLR', type: 'input' },
            { pin: 14, name: 'VCC',  type: 'power' }
        ],
        _state: { q1: 0, q2: 0, prevClk1: 0, prevClk2: 0 },
        simulate: function(pins) {
            var state = this._state;

            // Flip-flop 1: CLR(1), D(2), CLK(3), PRE(4), Q(5), Q'(6)
            // Active-low preset and clear
            if (!pins[1]) {
                state.q1 = 0;  // Clear
            } else if (!pins[4]) {
                state.q1 = 1;  // Preset
            } else if (pins[3] && !state.prevClk1) {
                // Rising edge
                state.q1 = pins[2] ? 1 : 0;
            }
            state.prevClk1 = pins[3];
            pins[5] = state.q1;
            pins[6] = state.q1 ? 0 : 1;

            // Flip-flop 2: CLR(13), D(12), CLK(11), PRE(10), Q(9), Q'(8)
            if (!pins[13]) {
                state.q2 = 0;
            } else if (!pins[10]) {
                state.q2 = 1;
            } else if (pins[11] && !state.prevClk2) {
                state.q2 = pins[12] ? 1 : 0;
            }
            state.prevClk2 = pins[11];
            pins[9] = state.q2;
            pins[8] = state.q2 ? 0 : 1;

            return pins;
        }
    },

    /* 7490 - Decade Counter (BCD) */
    '7490': {
        name: '7490',
        description: 'Decade Counter',
        pins: 14,
        pinout: [
            { pin: 1,  name: 'CKB',  type: 'input' },
            { pin: 2,  name: 'R0(1)',type: 'input' },
            { pin: 3,  name: 'R0(2)',type: 'input' },
            { pin: 4,  name: 'NC',   type: 'nc' },
            { pin: 5,  name: 'VCC',  type: 'power' },
            { pin: 6,  name: 'R9(1)',type: 'input' },
            { pin: 7,  name: 'R9(2)',type: 'input' },
            { pin: 8,  name: 'QC',   type: 'output' },
            { pin: 9,  name: 'QB',   type: 'output' },
            { pin: 10, name: 'GND',  type: 'power' },
            { pin: 11, name: 'QD',   type: 'output' },
            { pin: 12, name: 'QA',   type: 'output' },
            { pin: 13, name: 'NC',   type: 'nc' },
            { pin: 14, name: 'CKA',  type: 'input' }
        ],
        _state: { count: 0, prevCkA: 0, prevCkB: 0 },
        simulate: function(pins) {
            var state = this._state;

            // Reset logic
            if (pins[2] && pins[3]) {
                state.count = 0;  // R0 reset
            } else if (pins[6] && pins[7]) {
                state.count = 9;  // R9 set to 9
            } else {
                // CKA (pin 14) drives QA (divide by 2)
                // CKB (pin 1) drives QB,QC,QD (divide by 5)
                // For BCD counting: connect QA to CKB
                var ckaEdge = !pins[14] && state.prevCkA;  // falling edge
                var ckbEdge = !pins[1] && state.prevCkB;   // falling edge

                if (ckaEdge || ckbEdge) {
                    state.count = (state.count + 1) % 10;
                }
            }

            state.prevCkA = pins[14];
            state.prevCkB = pins[1];

            // Outputs
            pins[12] = (state.count & 1) ? 1 : 0;  // QA
            pins[9]  = (state.count & 2) ? 1 : 0;  // QB
            pins[8]  = (state.count & 4) ? 1 : 0;  // QC
            pins[11] = (state.count & 8) ? 1 : 0;  // QD

            return pins;
        }
    },

    /* 74138 - 3-to-8 Line Decoder/Demultiplexer */
    '74138': {
        name: '74138',
        description: '3-to-8 Decoder',
        pins: 16,
        pinout: [
            { pin: 1,  name: 'A',   type: 'input' },
            { pin: 2,  name: 'B',   type: 'input' },
            { pin: 3,  name: 'C',   type: 'input' },
            { pin: 4,  name: 'G2A', type: 'input' },
            { pin: 5,  name: 'G2B', type: 'input' },
            { pin: 6,  name: 'G1',  type: 'input' },
            { pin: 7,  name: 'Y7',  type: 'output' },
            { pin: 8,  name: 'GND', type: 'power' },
            { pin: 9,  name: 'Y6',  type: 'output' },
            { pin: 10, name: 'Y5',  type: 'output' },
            { pin: 11, name: 'Y4',  type: 'output' },
            { pin: 12, name: 'Y3',  type: 'output' },
            { pin: 13, name: 'Y2',  type: 'output' },
            { pin: 14, name: 'Y1',  type: 'output' },
            { pin: 15, name: 'Y0',  type: 'output' },
            { pin: 16, name: 'VCC', type: 'power' }
        ],
        simulate: function(pins) {
            // Enable: G1=HIGH, G2A=LOW, G2B=LOW
            var enabled = pins[6] && !pins[4] && !pins[5];
            var addr = (pins[1] ? 1 : 0) | ((pins[2] ? 1 : 0) << 1) | ((pins[3] ? 1 : 0) << 2);

            // All outputs HIGH (inactive) by default (active LOW outputs)
            var outputPins = [15, 14, 13, 12, 11, 10, 9, 7]; // Y0-Y7
            for (var i = 0; i < 8; i++) {
                pins[outputPins[i]] = (enabled && i === addr) ? 0 : 1;
            }

            return pins;
        }
    },

    /* 74151 - 8-to-1 Multiplexer */
    '74151': {
        name: '74151',
        description: '8-to-1 Multiplexer',
        pins: 16,
        pinout: [
            { pin: 1,  name: 'D3',   type: 'input' },
            { pin: 2,  name: 'D2',   type: 'input' },
            { pin: 3,  name: 'D1',   type: 'input' },
            { pin: 4,  name: 'D0',   type: 'input' },
            { pin: 5,  name: 'Y',    type: 'output' },
            { pin: 6,  name: 'W',    type: 'output' },
            { pin: 7,  name: 'G',    type: 'input' },
            { pin: 8,  name: 'GND',  type: 'power' },
            { pin: 9,  name: 'C',    type: 'input' },
            { pin: 10, name: 'B',    type: 'input' },
            { pin: 11, name: 'A',    type: 'input' },
            { pin: 12, name: 'D7',   type: 'input' },
            { pin: 13, name: 'D6',   type: 'input' },
            { pin: 14, name: 'D5',   type: 'input' },
            { pin: 15, name: 'D4',   type: 'input' },
            { pin: 16, name: 'VCC',  type: 'power' }
        ],
        simulate: function(pins) {
            var enabled = !pins[7];  // G active LOW
            var addr = (pins[11] ? 1 : 0) | ((pins[10] ? 1 : 0) << 1) | ((pins[9] ? 1 : 0) << 2);
            var dataPins = [4, 3, 2, 1, 15, 14, 13, 12]; // D0-D7

            if (enabled) {
                var selected = pins[dataPins[addr]] ? 1 : 0;
                pins[5] = selected;     // Y
                pins[6] = selected ? 0 : 1;  // W (complement)
            } else {
                pins[5] = 0;
                pins[6] = 1;
            }

            return pins;
        }
    },

    /* 74161 - 4-bit Synchronous Binary Counter */
    '74161': {
        name: '74161',
        description: '4-bit Binary Counter',
        pins: 16,
        pinout: [
            { pin: 1,  name: 'CLR',  type: 'input' },
            { pin: 2,  name: 'CLK',  type: 'input' },
            { pin: 3,  name: 'A',    type: 'input' },
            { pin: 4,  name: 'B',    type: 'input' },
            { pin: 5,  name: 'C',    type: 'input' },
            { pin: 6,  name: 'D',    type: 'input' },
            { pin: 7,  name: 'ENP',  type: 'input' },
            { pin: 8,  name: 'GND',  type: 'power' },
            { pin: 9,  name: 'LOAD', type: 'input' },
            { pin: 10, name: 'ENT',  type: 'input' },
            { pin: 11, name: 'QD',   type: 'output' },
            { pin: 12, name: 'QC',   type: 'output' },
            { pin: 13, name: 'QB',   type: 'output' },
            { pin: 14, name: 'QA',   type: 'output' },
            { pin: 15, name: 'RCO',  type: 'output' },
            { pin: 16, name: 'VCC',  type: 'power' }
        ],
        _state: { count: 0, prevClk: 0 },
        simulate: function(pins) {
            var state = this._state;

            if (!pins[1]) {
                // Asynchronous clear (active LOW)
                state.count = 0;
            } else if (pins[2] && !state.prevClk) {
                // Rising edge of clock
                if (!pins[9]) {
                    // Load (active LOW)
                    state.count = (pins[3] ? 1 : 0) |
                                  ((pins[4] ? 1 : 0) << 1) |
                                  ((pins[5] ? 1 : 0) << 2) |
                                  ((pins[6] ? 1 : 0) << 3);
                } else if (pins[7] && pins[10]) {
                    // Count (both enables HIGH)
                    state.count = (state.count + 1) & 0xF;
                }
            }

            state.prevClk = pins[2];

            pins[14] = (state.count & 1) ? 1 : 0;   // QA
            pins[13] = (state.count & 2) ? 1 : 0;   // QB
            pins[12] = (state.count & 4) ? 1 : 0;   // QC
            pins[11] = (state.count & 8) ? 1 : 0;   // QD
            pins[15] = (state.count === 15 && pins[10]) ? 1 : 0; // RCO

            return pins;
        }
    },

    /* 74195 - 4-bit Parallel-Access Shift Register */
    '74195': {
        name: '74195',
        description: '4-bit Shift Register',
        pins: 16,
        pinout: [
            { pin: 1,  name: 'CLR',   type: 'input' },
            { pin: 2,  name: 'J',     type: 'input' },
            { pin: 3,  name: 'K\'',   type: 'input' },
            { pin: 4,  name: 'A',     type: 'input' },
            { pin: 5,  name: 'B',     type: 'input' },
            { pin: 6,  name: 'C',     type: 'input' },
            { pin: 7,  name: 'D',     type: 'input' },
            { pin: 8,  name: 'GND',   type: 'power' },
            { pin: 9,  name: 'SH/LD', type: 'input' },
            { pin: 10, name: 'CLK',   type: 'input' },
            { pin: 11, name: 'QD',    type: 'output' },
            { pin: 12, name: 'QD\'',  type: 'output' },
            { pin: 13, name: 'QC',    type: 'output' },
            { pin: 14, name: 'QB',    type: 'output' },
            { pin: 15, name: 'QA',    type: 'output' },
            { pin: 16, name: 'VCC',   type: 'power' }
        ],
        _state: { qa: 0, qb: 0, qc: 0, qd: 0, prevClk: 0 },
        simulate: function(pins) {
            var state = this._state;

            if (!pins[1]) {
                // Clear (active LOW)
                state.qa = state.qb = state.qc = state.qd = 0;
            } else if (pins[10] && !state.prevClk) {
                // Rising edge
                if (!pins[9]) {
                    // Parallel load
                    state.qa = pins[4] ? 1 : 0;
                    state.qb = pins[5] ? 1 : 0;
                    state.qc = pins[6] ? 1 : 0;
                    state.qd = pins[7] ? 1 : 0;
                } else {
                    // Shift right
                    var serialIn;
                    if (pins[2] && !pins[3]) {
                        serialIn = 0;
                    } else if (!pins[2] && pins[3]) {
                        serialIn = 1;
                    } else if (pins[2] && pins[3]) {
                        serialIn = 1; // J=1, K'=1 -> toggle, simplified
                    } else {
                        serialIn = 0; // J=0, K'=0 -> set 0
                    }
                    state.qd = state.qc;
                    state.qc = state.qb;
                    state.qb = state.qa;
                    state.qa = serialIn;
                }
            }

            state.prevClk = pins[10];

            pins[15] = state.qa;
            pins[14] = state.qb;
            pins[13] = state.qc;
            pins[11] = state.qd;
            pins[12] = state.qd ? 0 : 1; // QD'

            return pins;
        }
    }
};
