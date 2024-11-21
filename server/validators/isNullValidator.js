function validateIsNull(array) {
    array.forEach(item => {
        if (((typeof item) === 'number') ? false : !item?.trim()) {
            throw new Error('Все поля должны быть заполнены!')
        }
    });
}

function validateObjectIsNull(array) {
    const isArray = !array.every((item) =>
        item.question?.trim() &&
        item.answer?.trim()
    );
    if (isArray) {
        throw new Error('Все поля должны быть заполнены!')
    }
}

function validateCheck(isBool, msg) {
    if (isBool) {
        throw new Error(`${msg}`)
    }
}

module.exports = { validateIsNull, validateObjectIsNull, validateCheck };