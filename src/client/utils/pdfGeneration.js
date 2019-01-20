import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function generatePdf(data) {
    console.log(data);
    var dd = {
        content: [
            'Migraine App Data',
            'This option is currently unavaliable'
        ]
        
    }
    pdfMake.createPdf(dd).download();
}