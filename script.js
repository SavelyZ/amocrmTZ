/// <reference path="E:\web\typings\globals\jquery\index.d.ts" />

const AmoCRM = require('amocrm-js');
const crm = new AmoCRM({
    domain: 'zhulanovse.amocrm.ru',
    auth: {
        client_id: 'f3a82713-65f5-42b8-bfb2-ccffc40028d5', // ID интеграции
        client_secret: 'T1Uc5bYHBL88zYOIW09lm5p3OA3fm10HZc3XzvcDht5dgRjIuNVuG4ZvC0esUHZr', // Секретный ключ
        redirect_uri: 'https://example.com', // Ссылка для перенаправления
        code: 'def50200e33b718ae9d736b4809f7257047357f4f069cbf2355f589576d359def8e48684e4cc9c87b45f46a828a3f2a232e611289279c927eb9c63e1981667a945fa079e764da94743255d3cbf08c9e82913a4b9edd5efc558a78b06c8785ec675ce2e9cced696ebaabe83d2e0135ee35c0ff541bfb4c439b6641c1e5c8847290442740f1cbdd815134dfe4d3aa568091f1f5f379b887cf5d26dbb0efcf11f3e88d6f602968b62001e92efb53ba3396daccd06f65613274b56d15863fff10f92fc499060640b717da56dfb36308d985a8a3b0f7f62c6f41b476e59571a49b0a03e8a559ebe11de5b6c42be55c09161337e3b73eb3193b0d1343520fb08a53be559671f232f64a33df60774aad711fbc3e08615c8a6bc0cc31bfa5bc97d4e1dba2450ca0a0fabcd8f4768d1eb61137e575864211eba65424a762f374369a7f3f2096d07c787d4ba9df87c28d62aa16158da2777421aa051c5109f93547e8b27397a6b5311f2d7b0d71b8c674ae4e1a82f76fcc191ad3e16477e8b2a92c11167fd9989d9c66fd334f1dd9e8db6e108a50b1ada071939e7bb66609059ca5504ef1f33bbf94b34af18127e2d4e252aa0e06fdaad4bd567ba02f2dc067a46aa' // Код авторизации
    },
});

(async() => {
    const responseContacts = await crm.request('GET', '/api/v4/contacts', 'with');
    const resLeads = await crm.request.get('/api/v4/leads', 'with');
    let countContacts = responseContacts.data._embedded.contacts.length,
        countLeads = resLeads.data._embedded.leads.length;
    console.log('count leads = ', countLeads);
    console.log('count contacts = ', responseContacts.data._embedded.contacts.length);
    console.log('-------leads---------');
    for (let i = 0; i < countLeads; i++) {
        console.log('lead ', i, ' ', resLeads.data._embedded.leads[i]._embedded);
    }
    let n;
    console.log('------contacts-------');
    for (let i = 0; i < countContacts; i++) {
        console.log('chel ', i, ' ', responseContacts.data._embedded.contacts[i]._embedded); //_embedded);
        n = i;
    }
    console.log(responseContacts.data._embedded.contacts[n].name, ' ', responseContacts.data._embedded.contacts[n].id);
    const response = await crm.request.post('/api/v4/tasks', [{
        "text": "КЛИЕНТ БЕЗ СДЕЛОК!!!",
        "complete_till": 1588885140,
        "entity_id": "3050141"
    }])
    console.log(response.data);
})();