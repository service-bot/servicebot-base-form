function toCents (amount) {
    if (typeof amount !== 'string' && typeof amount !== 'number') {
        throw new Error('Amount passed must be of type String or Number.')
    }

    return Math.round(100 * parseFloat(typeof amount === 'string' ? amount.replace(/[$,]/g, '') : amount))
}
export {toCents}