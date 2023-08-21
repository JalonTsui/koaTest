const fs = require('fs');
const path = require('path')

const createFile = (arr, file_path) => {
    // 将数组转换为字符串，每个元素占一行
    const arrayAsString = arr.join('\n');
    try {
        const filePath = path.dirname(file_path)
        fs.mkdirSync(filePath, { recursive: true })
        streamWrite(file_path, arrayAsString)
    } catch (err) {
        console.log(err)
    }
}

const streamWrite = (filePath, ctx) => {
    const writeStream = fs.createWriteStream(filePath)
    writeStream.write(ctx)
    writeStream.end()
    writeStream.on('finish', () => {
        console.log('done')
    })
    writeStream.on('error', (err) => {
        console.log(err)
    })
}

exports.createFile = createFile

