(async function() {
    await handleSheet();
}());

async function handleSheet() {
    try {
        const { GoogleSpreadsheet } = require('google-spreadsheet');

        const doc = new GoogleSpreadsheet('<id sheet>');
        const serviceAccount = require('./service-account.json')

        await doc.useServiceAccountAuth(serviceAccount);

        await doc.loadInfo();

        // loads document properties and worksheets
        console.log(doc.title);
        await doc.updateProperties({ title: 'quy test cai nhe' });

        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
        console.log(sheet.title);
        console.log(sheet.rowCount);
        // create a sheet and set the header row
        await sheet.setHeaderRow(['name', 'accountNumber', "createdAt"])
        await sheet.addRows([
            ['quy', 'abc', 1561521632],
            ['quy2', 'abc', 1561521632],
            ['quy3', 'abc', 1561521632],
        ])

        console.log(sheet.headerValues)
    } catch (e) {
        console.error(e)
    }

}
