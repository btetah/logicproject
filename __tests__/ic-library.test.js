/**
 * Tests for the IC Library - verifying correct logic gate behavior
 * for all 74xx series ICs in the DTK02 simulator.
 */

const fs = require('fs');
const path = require('path');

// Load the IC library source
const icLibSrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'ic-library.js'), 'utf8');
eval(icLibSrc);

describe('ICLibrary', () => {
    test('should define all expected ICs', () => {
        const expectedICs = ['7400', '7402', '7404', '7408', '7432', '7486',
                             '7447', '7474', '7490', '74138', '74151', '74161', '74195'];
        expectedICs.forEach(ic => {
            expect(ICLibrary[ic]).toBeDefined();
            expect(ICLibrary[ic].name).toBe(ic);
            expect(ICLibrary[ic].simulate).toBeInstanceOf(Function);
        });
    });

    describe('7400 - Quad 2-Input NAND', () => {
        test('NAND truth table: gate 1', () => {
            const ic = ICLibrary['7400'];
            // NAND(0,0) = 1
            expect(ic.simulate({1:0, 2:0})[3]).toBe(1);
            // NAND(0,1) = 1
            expect(ic.simulate({1:0, 2:1})[3]).toBe(1);
            // NAND(1,0) = 1
            expect(ic.simulate({1:1, 2:0})[3]).toBe(1);
            // NAND(1,1) = 0
            expect(ic.simulate({1:1, 2:1})[3]).toBe(0);
        });

        test('NAND truth table: gate 2', () => {
            const ic = ICLibrary['7400'];
            expect(ic.simulate({4:0, 5:0})[6]).toBe(1);
            expect(ic.simulate({4:0, 5:1})[6]).toBe(1);
            expect(ic.simulate({4:1, 5:0})[6]).toBe(1);
            expect(ic.simulate({4:1, 5:1})[6]).toBe(0);
        });

        test('has 14 pins', () => {
            expect(ICLibrary['7400'].pins).toBe(14);
        });
    });

    describe('7402 - Quad 2-Input NOR', () => {
        test('NOR truth table: gate 1', () => {
            const ic = ICLibrary['7402'];
            // NOR(0,0) = 1
            expect(ic.simulate({2:0, 3:0})[1]).toBe(1);
            // NOR(0,1) = 0
            expect(ic.simulate({2:0, 3:1})[1]).toBe(0);
            // NOR(1,0) = 0
            expect(ic.simulate({2:1, 3:0})[1]).toBe(0);
            // NOR(1,1) = 0
            expect(ic.simulate({2:1, 3:1})[1]).toBe(0);
        });

        test('has 14 pins', () => {
            expect(ICLibrary['7402'].pins).toBe(14);
        });
    });

    describe('7404 - Hex Inverter (NOT)', () => {
        test('NOT truth table: all 6 gates', () => {
            const ic = ICLibrary['7404'];
            let pins;
            // Gate 1: input pin 1, output pin 2
            pins = ic.simulate({1:0});
            expect(pins[2]).toBe(1);
            pins = ic.simulate({1:1});
            expect(pins[2]).toBe(0);

            // Gate 2: input pin 3, output pin 4
            pins = ic.simulate({3:0});
            expect(pins[4]).toBe(1);
            pins = ic.simulate({3:1});
            expect(pins[4]).toBe(0);

            // Gate 3: input pin 5, output pin 6
            pins = ic.simulate({5:0});
            expect(pins[6]).toBe(1);
            pins = ic.simulate({5:1});
            expect(pins[6]).toBe(0);
        });

        test('has 14 pins', () => {
            expect(ICLibrary['7404'].pins).toBe(14);
        });
    });

    describe('7408 - Quad 2-Input AND', () => {
        test('AND truth table: gate 1', () => {
            const ic = ICLibrary['7408'];
            expect(ic.simulate({1:0, 2:0})[3]).toBe(0);
            expect(ic.simulate({1:0, 2:1})[3]).toBe(0);
            expect(ic.simulate({1:1, 2:0})[3]).toBe(0);
            expect(ic.simulate({1:1, 2:1})[3]).toBe(1);
        });

        test('AND truth table: gate 3', () => {
            const ic = ICLibrary['7408'];
            expect(ic.simulate({9:0, 10:0})[8]).toBe(0);
            expect(ic.simulate({9:0, 10:1})[8]).toBe(0);
            expect(ic.simulate({9:1, 10:0})[8]).toBe(0);
            expect(ic.simulate({9:1, 10:1})[8]).toBe(1);
        });
    });

    describe('7432 - Quad 2-Input OR', () => {
        test('OR truth table: gate 1', () => {
            const ic = ICLibrary['7432'];
            expect(ic.simulate({1:0, 2:0})[3]).toBe(0);
            expect(ic.simulate({1:0, 2:1})[3]).toBe(1);
            expect(ic.simulate({1:1, 2:0})[3]).toBe(1);
            expect(ic.simulate({1:1, 2:1})[3]).toBe(1);
        });
    });

    describe('7486 - Quad 2-Input XOR', () => {
        test('XOR truth table: gate 1', () => {
            const ic = ICLibrary['7486'];
            expect(ic.simulate({1:0, 2:0})[3]).toBe(0);
            expect(ic.simulate({1:0, 2:1})[3]).toBe(1);
            expect(ic.simulate({1:1, 2:0})[3]).toBe(1);
            expect(ic.simulate({1:1, 2:1})[3]).toBe(0);
        });
    });

    describe('7447 - BCD to 7-Segment Decoder', () => {
        test('should decode digit 0 correctly', () => {
            const ic = ICLibrary['7447'];
            // BCD 0: A=0,B=0,C=0,D=0 → pin7=A=0, pin1=B=0, pin2=C=0, pin6=D=0
            const pins = ic.simulate({7:0, 1:0, 2:0, 6:0});
            // Digit 0: segments a,b,c,d,e,f ON, g OFF
            // Active LOW output → our simulator inverts: 1=ON
            expect(pins[13]).toBe(1); // a
            expect(pins[12]).toBe(1); // b
            expect(pins[11]).toBe(1); // c
            expect(pins[10]).toBe(1); // d
            expect(pins[9]).toBe(1);  // e
            expect(pins[15]).toBe(1); // f
            expect(pins[14]).toBe(0); // g
        });

        test('should decode digit 1 correctly', () => {
            const ic = ICLibrary['7447'];
            // BCD 1: A=1,B=0,C=0,D=0
            const pins = ic.simulate({7:1, 1:0, 2:0, 6:0});
            // Digit 1: segments b,c ON, rest OFF
            expect(pins[13]).toBe(0); // a OFF
            expect(pins[12]).toBe(1); // b ON
            expect(pins[11]).toBe(1); // c ON
            expect(pins[10]).toBe(0); // d OFF
            expect(pins[9]).toBe(0);  // e OFF
            expect(pins[15]).toBe(0); // f OFF
            expect(pins[14]).toBe(0); // g OFF
        });

        test('should decode digit 8 correctly', () => {
            const ic = ICLibrary['7447'];
            // BCD 8: A=0,B=0,C=0,D=1
            const pins = ic.simulate({7:0, 1:0, 2:0, 6:1});
            // Digit 8: all segments ON
            expect(pins[13]).toBe(1); // a
            expect(pins[12]).toBe(1); // b
            expect(pins[11]).toBe(1); // c
            expect(pins[10]).toBe(1); // d
            expect(pins[9]).toBe(1);  // e
            expect(pins[15]).toBe(1); // f
            expect(pins[14]).toBe(1); // g
        });

        test('has 16 pins', () => {
            expect(ICLibrary['7447'].pins).toBe(16);
        });
    });

    describe('7474 - Dual D Flip-Flop', () => {
        test('should clear on active-low CLR', () => {
            const ic = ICLibrary['7474'];
            // Reset state
            ic._state = { q1: 0, q2: 0, prevClk1: 0, prevClk2: 0 };

            // CLR=0 (active), PRE=1, D=1, CLK=0
            const pins = ic.simulate({1:0, 2:1, 3:0, 4:1});
            expect(pins[5]).toBe(0);  // Q = 0
            expect(pins[6]).toBe(1);  // Q' = 1
        });

        test('should preset on active-low PRE', () => {
            const ic = ICLibrary['7474'];
            ic._state = { q1: 0, q2: 0, prevClk1: 0, prevClk2: 0 };

            // CLR=1, PRE=0 (active), D=0, CLK=0
            const pins = ic.simulate({1:1, 2:0, 3:0, 4:0});
            expect(pins[5]).toBe(1);  // Q = 1
            expect(pins[6]).toBe(0);  // Q' = 0
        });

        test('should latch D on rising edge', () => {
            const ic = ICLibrary['7474'];
            ic._state = { q1: 0, q2: 0, prevClk1: 0, prevClk2: 0 };

            // Set D=1, CLK rising edge (0->1), CLR=1, PRE=1
            ic.simulate({1:1, 2:1, 3:0, 4:1}); // CLK=0 first
            const pins = ic.simulate({1:1, 2:1, 3:1, 4:1}); // CLK=1 rising edge
            expect(pins[5]).toBe(1);  // Q = D = 1
            expect(pins[6]).toBe(0);  // Q' = 0
        });
    });

    describe('74138 - 3-to-8 Line Decoder', () => {
        test('should select Y0 when A=B=C=0 and enabled', () => {
            const ic = ICLibrary['74138'];
            // Enable: G1=1, G2A=0, G2B=0; Address: A=0, B=0, C=0
            const pins = ic.simulate({1:0, 2:0, 3:0, 4:0, 5:0, 6:1});
            expect(pins[15]).toBe(0); // Y0 active (LOW)
            expect(pins[14]).toBe(1); // Y1 inactive
            expect(pins[13]).toBe(1); // Y2 inactive
            expect(pins[12]).toBe(1); // Y3 inactive
        });

        test('should select Y5 when A=1, B=0, C=1 and enabled', () => {
            const ic = ICLibrary['74138'];
            const pins = ic.simulate({1:1, 2:0, 3:1, 4:0, 5:0, 6:1});
            expect(pins[15]).toBe(1); // Y0 inactive
            expect(pins[10]).toBe(0); // Y5 active (LOW)
        });

        test('all outputs HIGH when disabled', () => {
            const ic = ICLibrary['74138'];
            // G1=0 (disabled)
            const pins = ic.simulate({1:0, 2:0, 3:0, 4:0, 5:0, 6:0});
            expect(pins[15]).toBe(1); // Y0
            expect(pins[14]).toBe(1); // Y1
            expect(pins[7]).toBe(1);  // Y7
        });

        test('has 16 pins', () => {
            expect(ICLibrary['74138'].pins).toBe(16);
        });
    });

    describe('74151 - 8-to-1 Multiplexer', () => {
        test('should select D0 when address is 0', () => {
            const ic = ICLibrary['74151'];
            // G=0 (enabled), A=0, B=0, C=0 → select D0 (pin 4)
            const pins = ic.simulate({4:1, 7:0, 11:0, 10:0, 9:0}); // D0=1
            expect(pins[5]).toBe(1); // Y
            expect(pins[6]).toBe(0); // W (complement)
        });

        test('should select D3 when address is 3', () => {
            const ic = ICLibrary['74151'];
            // G=0, A=1, B=1, C=0 → select D3 (pin 1)
            const pins = ic.simulate({1:1, 7:0, 11:1, 10:1, 9:0}); // D3=1
            expect(pins[5]).toBe(1); // Y
        });

        test('should output 0 when disabled', () => {
            const ic = ICLibrary['74151'];
            // G=1 (disabled)
            const pins = ic.simulate({4:1, 7:1, 11:0, 10:0, 9:0});
            expect(pins[5]).toBe(0); // Y
            expect(pins[6]).toBe(1); // W
        });
    });

    describe('74161 - 4-bit Binary Counter', () => {
        test('should clear to 0', () => {
            const ic = ICLibrary['74161'];
            ic._state = { count: 5, prevClk: 0 };

            // CLR=0 (active low)
            const pins = ic.simulate({1:0, 2:0, 7:1, 9:1, 10:1});
            expect(pins[14]).toBe(0); // QA
            expect(pins[13]).toBe(0); // QB
            expect(pins[12]).toBe(0); // QC
            expect(pins[11]).toBe(0); // QD
        });

        test('should count on rising edge when enabled', () => {
            const ic = ICLibrary['74161'];
            ic._state = { count: 0, prevClk: 0 };

            // CLR=1, LOAD=1, ENP=1, ENT=1, CLK=1 (rising edge from 0)
            ic.simulate({1:1, 2:1, 7:1, 9:1, 10:1});
            expect(ic._state.count).toBe(1);
        });

        test('should wrap from 15 to 0', () => {
            const ic = ICLibrary['74161'];
            ic._state = { count: 15, prevClk: 0 };

            const pins = ic.simulate({1:1, 2:1, 7:1, 9:1, 10:1});
            expect(ic._state.count).toBe(0);
            // QA-QD should be 0
            expect(pins[14]).toBe(0);
            expect(pins[13]).toBe(0);
            expect(pins[12]).toBe(0);
            expect(pins[11]).toBe(0);
        });
    });

    describe('7490 - Decade Counter', () => {
        test('should reset to 0 when R0(1) and R0(2) are HIGH', () => {
            const ic = ICLibrary['7490'];
            ic._state = { count: 5, prevCkA: 0, prevCkB: 0 };

            const pins = ic.simulate({2:1, 3:1, 6:0, 7:0, 14:0, 1:0});
            expect(pins[12]).toBe(0); // QA
            expect(pins[9]).toBe(0);  // QB
            expect(pins[8]).toBe(0);  // QC
            expect(pins[11]).toBe(0); // QD
        });

        test('should set to 9 when R9(1) and R9(2) are HIGH', () => {
            const ic = ICLibrary['7490'];
            ic._state = { count: 0, prevCkA: 0, prevCkB: 0 };

            const pins = ic.simulate({2:0, 3:0, 6:1, 7:1, 14:0, 1:0});
            // 9 = 1001
            expect(pins[12]).toBe(1); // QA = 1
            expect(pins[9]).toBe(0);  // QB = 0
            expect(pins[8]).toBe(0);  // QC = 0
            expect(pins[11]).toBe(1); // QD = 1
        });
    });
});
