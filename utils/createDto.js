function renameKeys(item, oldKeys, newKeys) {
    let plainItem = item.get ? item.get({ plain: true }) : item;
    oldKeys.forEach((oldKey, index) => {
        const newKey = newKeys[index];
        if (plainItem.hasOwnProperty(oldKey)) {
            plainItem[newKey] = plainItem[oldKey];
            delete plainItem[oldKey];
        }
    });
    return plainItem;
}

module.exports = renameKeys