export class Utils {
    static parseLocaleNumber(stringNumber: string): number {
        const thousandSeparator = (1111).toLocaleString().replace(/1/g, '');
        const decimalSeparator = (1.1).toLocaleString().replace(/1/g, '');

        return parseFloat(stringNumber
            .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
            .replace(new RegExp('\\' + decimalSeparator), '.')
        );
    }
}
