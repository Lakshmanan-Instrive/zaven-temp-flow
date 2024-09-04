export const getQueryParams = (search) => {
    if (!search) {
        return {};
    }

    const params = new URLSearchParams(search);
    const obj = {};
    for (const [key, value] of params.entries()) {
        if (obj[key]) {
            obj[key] = [].concat(obj[key], value);
        } else {
            obj[key] = value;
        }
    }
    return obj;
};
