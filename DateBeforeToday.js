//#Name - DateBeforeToday
//#Author - Maxolian2010
//#Version - 1.0

(function(Scratch) {
    'use strict';

    class DateBeforeToday {
        getInfo() {
            return {
                id: 'dateBeforeToday',
                name: 'Date Checker',
                blocks: [
                    {
                        opcode: 'isBeforeToday',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Is "[DATE]" before Today?',
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

        isBeforeToday(args) {
            const input = args.DATE;
            try {
                // Validate format using RegEx
                if (!/^\d{2}-\d{2}-\d{4}$/.test(input)) {
                    throw new Error("Invalid format. Use dd-mm-yyyy.");
                }

                const [day, month, year] = input.split('-').map(Number);

                // Check if date is valid
                const inputDate = new Date(year, month - 1, day);
                if (
                    inputDate.getDate() !== day ||
                    inputDate.getMonth() !== month - 1 ||
                    inputDate.getFullYear() !== year
                ) {
                    throw new Error("Invalid date.");
                }

                // Get today's date without time
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return inputDate < today;
            } catch (err) {
                return `Error: ${err.message}`;
            }
        }
    }

    Scratch.extensions.register(new DateBeforeToday());
})(Scratch);
