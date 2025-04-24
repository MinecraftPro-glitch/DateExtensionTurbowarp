//#Name - Date Blocks
//#Author - Maxolian2010
//#Version - 1.0

(function(Scratch) {
    'use strict';

    class DateAfterInput {
        getInfo() {
            return {
                id: 'dateAfterInput',
                name: 'Date Checker 2',
                blocks: [
                    {
                        opcode: 'isTodayAfter',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Is Today after "[DATE]"?',
                        arguments: {
                            DATE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '01-01-2000'
                            }
                        }
                    },
                    {
                        opcode: 'daysBetween',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'How many days between Today and "[DATE]"?',
                        arguments: {
                            DATE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '01-01-2000'
                            }
                        }
                    }
                ]
            };
        }

        isTodayAfter(args) {
            const input = args.DATE;
            try {
                const inputDate = this.parseDate(input);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return today > inputDate;
            } catch (err) {
                return `Error: ${err.message}`;
            }
        }

        daysBetween(args) {
            const input = args.DATE;
            try {
                const inputDate = this.parseDate(input);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const diffMs = today - inputDate;
                const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
                return diffDays;
            } catch (err) {
                return `Error: ${err.message}`;
            }
        }

        parseDate(str) {
            if (!/^\d{2}-\d{2}-\d{4}$/.test(str)) {
                throw new Error("Invalid format. Use dd-mm-yyyy.");
            }
            const [day, month, year] = str.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            if (
                date.getDate() !== day ||
                date.getMonth() !== month - 1 ||
                date.getFullYear() !== year
            ) {
                throw new Error("Invalid date.");
            }
            date.setHours(0, 0, 0, 0);
            return date;
        }
    }

    Scratch.extensions.register(new DateAfterInput());
})(Scratch);
