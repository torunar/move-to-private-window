browser.menus.create({
    title: browser.i18n.getMessage('mtpwMoveToPrivateWindow'),
    contexts: ['tab'],
    onclick: mtpwMoveToPrivateWindow
});

async function mtpwMoveToPrivateWindow(info, tab) {
    const url = info.pageUrl;
    if (!url.startsWith('http')) {
        return;
    }

    const windowId = await mtpwGetPrivateWindow();
    browser.tabs.create({ windowId, url}).then(() => browser.tabs.remove(tab.id));
}

async function mtpwGetPrivateWindow() {
    for (const windowInfo of (await browser.windows.getAll())) {
        if (windowInfo.incognito) {
            return windowInfo.id;
        }
    }

    return (await browser.windows.create({incognito: true})).id;
}
