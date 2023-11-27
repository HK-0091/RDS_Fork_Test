const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3131;

app.set('view engine', 'pug');
app.set('views', './src/pug');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.locals.pretty = true;

app.get('/', (req, res) => {
    res.render('pug_fork');
});

//로봇 상태 정보 가져오기
function robot_Status(value) {
    const options_status = {
        hostname: '192.168.0.5',
        port: 8088,
        path: `/orderDetailsByBlockId/${value}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const req = http.request(options_status, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log('요청이 성공적으로 처리되었습니다.');
                console.log('상태 응답 데이터:');
                console.log(responseData);
            } else {
                console.log('요청이 실패하였습니다. 상태 코드:', res.statusCode);
                console.log('에러 메시지:');
                console.log(responseData);
            }
        });
    });

    req.on('error', (error) => {
        console.error('요청 중 오류가 발생하였습니다:', error);
    });
    req.end();
}

//container load
function Container_load(bintask_mid, bintask_load, bintask_complete, binTask_content, robotId) {
    const options = {
        hostname: '192.168.0.5',
        port: 8088,
        path: '/setOrder',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    let now = Date.now();

    const requestData_load = {
        "id": `${now}0`,
        "fromOrder": {
            "id": `${now}1`,
            "blocks": [
                { "blockId": `${now}2`, "location": `${bintask_mid}`, "binTask": `Fork_Load_${binTask_content}` },
            ],
            "complete": true
        },
        "toOrder": {
            "id": `${now}3`,
            "blocks": [
                { "blockId": `${now}4`, "location": `${bintask_load}`, "binTask": `Fork_Load_${binTask_content}` },
                { "blockId": `${now}5`, "location": `${bintask_complete}`, "binTask": 'Fork_Load_1' }
            ],
            "complete": true
        },
        "group": `${now}6`,
        "goodsId": `${now}7`,
        "vehicle": `${robotId}`
    }

    const req = http.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log('요청이 성공적으로 처리되었습니다.');
                console.log('테스트 응답 데이터:');
                console.log(responseData);
            } else {
                console.log('요청이 실패하였습니다. 상태 코드:', res.statusCode);
                console.log('에러 메시지:');
                console.log(responseData);
            }
        });
    });

    req.on('error', (error) => {
        console.error('요청 중 오류가 발생하였습니다:', error);
    });
    req.write(JSON.stringify(requestData_load));
    req.end();
}

//container unload
function Container_unload(bintask_mid, bintask_load, bintask_complete, binTask_content, robotId) {
    const options = {
        hostname: '192.168.0.5',
        port: 8088,
        path: '/setOrder',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    let now = Date.now();

    const requestData_load = {
        "id": `${now}0`,
        "fromOrder": {
            "id": `${now}1`,
            "blocks": [
                { "blockId": `${now}2`, "location": `${bintask_mid}`, "binTask": `Fork_Unload_${binTask_content}` },
            ],
            "complete": true
        },
        "toOrder": {
            "id": `${now}3`,
            "blocks": [
                { "blockId": `${now}4`, "location": `${bintask_load}`, "binTask": `Fork_Unload_${binTask_content}` },
                { "blockId": `${now}5`, "location": `${bintask_complete}`, "binTask": 'Fork_Unload_1' }
            ],
            "complete": true
        },
        "group": `${now}6`,
        "goodsId": `${now}7`,
        "vehicle": `${robotId}`
    }

    const req = http.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log('요청이 성공적으로 처리되었습니다.');
                console.log('테스트 응답 데이터:');
                console.log(responseData);
            } else {
                console.log('요청이 실패하였습니다. 상태 코드:', res.statusCode);
                console.log('에러 메시지:');
                console.log(responseData);
            }
        });
    });

    req.on('error', (error) => {
        console.error('요청 중 오류가 발생하였습니다:', error);
    });
    req.write(JSON.stringify(requestData_load));
    req.end();
}

//fork_move
app.post("/fork_load", (req, res) => {
    let fork_complete_location = req.body.fork_complete_location;
    let fork_load = req.body.fork_load;
    let fork_mid_height = req.body.fork_mid_height;
    let binTask_number = req.body.binTask_number;
    let select_fork = req.body.select_fork;
    Container_load(fork_mid_height, fork_load, fork_complete_location, binTask_number, select_fork)
    console.log(fork_mid_height);
    console.log(fork_load);
    console.log(fork_complete_location);
    console.log(binTask_number);    //LV1~3
    console.log(select_fork);
});

app.post("/fork_unload", (req, res) => {
    let fork_complete_location = req.body.fork_complete_location;
    let fork_load = req.body.fork_load;
    let fork_mid_height = req.body.fork_mid_height;
    let binTask_number = req.body.binTask_number;
    let select_fork = req.body.select_fork;
    Container_unload(fork_mid_height, fork_load, fork_complete_location, binTask_number, select_fork)
    console.log(fork_mid_height);
    console.log(fork_load);
    console.log(fork_complete_location);
    console.log(binTask_number);    //LV1~3
    console.log(select_fork);
});

app.listen(PORT, () => {
    console.log(`${PORT} START!`);
});