function haveSameStructure(obj1, obj2) {
    // Helper function to get the type of a value
    function getType(value) {
        if (Array.isArray(value)) return 'array';
        if (value === null) return 'null';
        return typeof value;
    }

    // Check if both inputs are objects
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if both objects have the same set of keys
    if (keys1.length !== keys2.length || !keys1.every(key => keys2.includes(key))) {
        return false;
    }

    // Recursively check each key's value type and structure
    for (const key of keys1) {
        const type1 = getType(obj1[key]);
        const type2 = getType(obj2[key]);

        if (type1 !== type2) return false;

        if (type1 === 'object' || type1 === 'array') {
            // Recurse into objects or arrays
            if (!haveSameStructure(obj1[key], obj2[key])) {
                return false;
            }
        }
    }

    return true;
}

export default haveSameStructure;