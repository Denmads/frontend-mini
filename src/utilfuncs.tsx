function intInput(value: string): number | undefined {
    if (!/^[0-9]+$/.test(value)) return undefined;
    
    try {
        let num = parseInt(value);
        if (isNaN(num)) return undefined;

        return num;
    }
    catch (e) {
        return undefined;
    }
}

export {intInput}