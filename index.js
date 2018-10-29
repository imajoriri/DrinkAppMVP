const AWS = require('aws-sdk');
const rp = require('request-promise');
const LINE = require('@line/bot-sdk');

//const { replySingerContent } = require('./functions/replySingerContent.js');

exports.handler = async function(event, context, callback) {
  const channelAccessToken = process.env["channelAccessToken"];
  const LINE_CLIENT = new LINE.Client({channelAccessToken: channelAccessToken});

  let response = { statusCode: 200 };
  var replyMessage = [];

  if(event.events[0].message.type === "text"){
    var requestMsg = event.events[0].message.text;
    if(requestMsg === "Want"){
      replyMessage.push({ 'type': 'text', 'text': "STATEを飲みたいに変更しました。" });
    }
    else if(requestMsg === "NotWant"){
      replyMessage.push({ 'type': 'text', 'text': "STATEを飲みたくないに変更しました。" });
    }
    else if(requestMsg === "List"){
      replyMessage.push({ 'type': 'text', 'text': "LIST" });
    }
    else if(requestMsg === "MySTATE"){
      replyMessage.push({ 'type': 'text', 'text': "あなたのSTATEは、、、" });
    }
    else{
      replyMessage.push({ 'type': 'text', 'text': "なんやそれ！" });
    }
  } else {
    replyMessage.push({ 'type': 'text', 'text': "テキストメッセージを入力してください。" });
  }

  // Botにメッセージをリプライ
  await LINE_CLIENT.replyMessage(event.events[0].replyToken, replyMessage);

  return response;
};

