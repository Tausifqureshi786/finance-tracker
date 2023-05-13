import express  from "express";
import { readFileSync } from "fs";
import PdfParse from "pdf-parse";

let pdfParseRouter = express.Router()

const pdfRead = './April_Statements.pdf'
let pdfContent = ""

interface Transaction {
    date: Date | undefined,
    place: String | '',
    amount: String | undefined

}

const getPDF = async (file: string) => {
  try {
    let pdfExtract = await PdfParse(readFileSync(file))

    // console.log("file contnet: ", pdfExtract.text)
    // console.log("Total pages: ", pdfExtract.numpages)
    pdfContent += pdfExtract.text
    // console.log("All content: ", pdfExtract.info)
    return pdfExtract.text
  } catch (error: any) {
    throw new Error(error)
  } 
}

const cleanString = (string: String): String[] => {
    let replacedString = string.trim()
    let transactionSplit = replacedString.split("\n") 

    let cleanTransactionsArr = transactionSplit.filter((val) => val !== '' && val !== "----" && val !== '|' 
    && !val.includes("OpeningBalance") && !val.includes("ClosingBalance"))

    return cleanTransactionsArr
}

const splitDate = (dateStr: String): {month: String, day: String} => {
    let Month = dateStr.slice(0,3)
    let Day = dateStr.slice(3)
    return {month: Month, day: Day }
}
pdfParseRouter.get("/",  function(req,  res) {
    let transactionObjectArr: Transaction[]  = []
    const pdf =  getPDF(pdfRead).then(responsePdf => {
        if(responsePdf !== null && responsePdf !== "" ) {
            
            let cleanTransactionsArr = cleanString(responsePdf.trim())
            
            cleanTransactionsArr.forEach((elem, index, arr) => {
            
                let reg = /(Jan?|Feb?|Mar?|Apr?|May?|Jun?|Jul?|Aug?|Sep?|Oct?|Nov?|Dec?)+\d{1,2}/g
                
                let match = elem.match(reg)
                if(match) {
                    let obj:Transaction = {
                        date: undefined,
                        place: "",
                        amount: undefined
                    }
                    let removedComma = elem.replace(',', "")
                    let removedDateElem = removedComma.replace(match[0], "")
                    // console.log(removedDateElem)
                    let fetchPriceFromElem = removedDateElem.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g)
                    if(fetchPriceFromElem) {
                        obj.amount = `$${fetchPriceFromElem[0]}`
                        let removedPriceFromElem = removedDateElem.replace(fetchPriceFromElem[0], "")
                        obj.place = `${removedPriceFromElem} ${arr[index+1]} `
                    }
                    let splittedDateObj = splitDate(match[0])

                    // date only works for the year 2023
                    obj.date = new Date(splittedDateObj.month+ ' ' + splittedDateObj.day + " " + "2023")
                    elem.replace(`${match[0]}`, "")
                    console.log(obj)
                    transactionObjectArr.push(obj)
                    // console.log(transactionObjectArr)
                }
                
            })
            // console.log(transactionObjectArr)
            res.send(transactionObjectArr)
        } else
        res.send({error: "The pdf was not parsed"})
    })



})


export {pdfParseRouter}