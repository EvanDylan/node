/*
    provides utilities for parsing and formatting URL query strings.
 */

const queryString = require('querystring');
const util = require('util');

var escape = queryString.escape('www.baidu.com?name=evan&性别=男');// 百分号编码(URI编码)
console.log(escape);

var unescape = queryString.unescape(escape);// 百分号解码(URI解码)
console.log(unescape);

// parses a URL query string (str) into a collection of key and value pairs,
/*
    第一个参数：需要序列化的字符串
    第二个参数：键值对之间的分隔符
    第三个参数：key和value之间的分隔符
    第四个参数：一个对象{decodeURIComponent: , maxKeys }
        The function to use when decoding percent-encoded characters in the query string.
         Defaults to querystring.unescape().
        Specifies the maximum number of keys to parse.
            Defaults to 1000. Specify 0 to remove key counting limitations.
    序列化的步骤是先对字符串进行分割，然后在对分割好的key、value进行解码。如果需要对编码的URI进行json序列化，需先调用unescape解码
  */
var string = queryString.unescape('name%3Devan%26%E6%80%A7%E5%88%AB%3D%E7%94%B7');
var json = queryString.parse(string, '&', '=', null);
console.log(json);

/**
 * 1.需要反序列化的json
 * 2.同上
 * 3.同上
 * 4.encodeURIComponent <Function> The function to use when converting URL-unsafe characters to percent-encoding in the query string.
 *   Defaults to querystring.escape().
 */
var jsonString = queryString.stringify(json, '&', '=', {encodeURIComponent: queryString.escape()});
console.log(jsonString);

queryString.unescapeBuffer(); ///a safe fast alternative to decodeURIComponent