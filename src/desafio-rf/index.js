const axios = require('axios');
const cheerio = require('cheerio');

const sitealvo = 'http://receita.economia.gov.br/interface/cidadao/irpf/2019/restituicao/2019';

axios.get(sitealvo)
.then(resp=>{
    let dadoshtml = resp.data;
    const $ = cheerio.load(dadoshtml);
    const colunas = [];
    $('#parent-fieldname-text > table > tbody > tr').each((i,e)=>{
        const todos = $(e).find('td');
        const lote = $(todos[0]).text();
        const data = $(todos[1]).text();
        const selic = $(todos[2]).text();
        const declaracao = $(todos[3]).text();

        const coluna = {lote, data, selic, declaracao};
        colunas.push(coluna);
    })
    console.log(colunas);
})