/***********************************************************************
 * Copyright (c) 2010 Bit Thicket Software
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function($) {
    $.fn.bytesize = function(settings) {
        var config = {
            unit: 'B',      /* bytes */
            standard: 'IEC' /* or SI */
        };

        // radix == 2
        var iecPrefixTable = [
            null,
            { prefix: 'kibi', abbrev: 'Ki' },
            { prefix: 'mebi', abbrev: 'Mi' },
            { prefix: 'gibi', abbrev: 'Gi' },
            { prefix: 'tebi', abbrev: 'Ti' },
            { prefix: 'pebi', abbrev: 'Pi' },
            { prefix: 'exbi', abbrev: 'Ei' },
            { prefix: 'zebi', abbrev: 'Zi' },
            { prefix: 'yobi', abbrev: 'Yi' }
        ];

        // radix == 10
        var siPrefixTable = [
            null,
            { prefix: 'kilo', abbrev: 'k' },
            { prefix: 'mega', abbrev: 'M' },
            { prefix: 'giga', abbrev: 'G' },
            { prefix: 'tera', abbrev: 'T' },
            { prefix: 'peta', abbrev: 'P' },
            { prefix: 'exa', abbrev: 'E' },
            { prefix: 'zetta', abbrev: 'Z' },
            { prefix: 'yotta', abbrev: 'Y' }
        ];

        if (settings) $.extend(config, settings);

        this.each(function() {
            // validate text of currect element as number
            if ($(this).text().match(/[^a-fA-F0-9]/)) {
                return;
            }

            // call the appropriate formatting function
            switch (config.standard) {
            case 'SI':
                $(this).text(formatSI($(this).text()) + config.unit);
                break;
            case 'IEC':
                $(this).text(formatIEC($(this).text()) + config.unit);
                break;
            }
        });

        function formatIEC(text) {
            // use radix = 2
            var n = normalize(new Number(text), 1024);
            if (!n.pow) {
                return text + ' ';
            }
            else {
                var iec = iecPrefixTable[n.pow];
                return n.q.toFixed(2).toString() + ' ' + iec.abbrev;
            }
        }

        function formatSI(text) {
            var n = normalize(new Number(text), 1000);
            if (!n.pow) {
                return text + ' ';
            } else {
                var si = siPrefixTable[n.pow];
                return n.q.toFixed(2).toString() + ' ' + si.abbrev;
            }
        }

        // takes integer number and returns something approximating scientific notation
        function normalize(magnitude, div) {            
            var q = Math.floor(magnitude / div);
            var pow = (q) ? 1 : 0;

            while (q && q > div) {
                q /= div;
                pow += 1;
            };

            return { q: q, pow: pow };
        }
        return this;
    };
})(jQuery);