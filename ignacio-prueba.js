const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html');
    
    const tableData = await page.evaluate(() => {
        let title = Array.from(document.querySelectorAll('table th'))
        const titlemap = title.map((p) => p.innerText)

        let data = []
        let table = document.getElementById('tabledatasii')
        for (let i = 0; i < table.rows.length; i++) {
            let objCells = table.rows.item(i).cells

            let values = []
            for (let j = 0; j < objCells.length; j++) {
                let text = objCells.item(j).innerHTML
                values.push(text)
                
            }

            let d = values
            data.push(d)
            
        }
        return data
    }) 
    

    fs.writeFile('data.json', JSON.stringify(tableData), "utf-8", ((err) => {
        if (err) {
            throw err
        } else {
            console.log("Archivo Creado")
        }
    }))

    await browser.close();
})();