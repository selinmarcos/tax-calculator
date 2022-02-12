function intervalo(){
   window.location.href = "#download"
   var downloadButton = document.getElementById("download");//.getAttribute("name");
   var counter = 15;
   var newElement = document.createElement("p");
   newElement.innerHTML = "Podrás descargar el PDF en 10 segundos.";
   var id;

   downloadButton.parentNode.replaceChild(newElement, downloadButton);
   id = setInterval(function() {
      counter--;	
      if(counter < 0) {
      newElement.parentNode.replaceChild(downloadButton, newElement); 
      clearInterval(id);

      downloadButton.innerHTML = `<a onclick="generate()"   target='_blank' align='center' style="text-align:left; color:#589BC4 !important;" > Descargar en PDF</a>`
      
     

      window.location.href = "#tableF"
      } else {
      newElement.innerHTML = "Podrás descargar el PDF en " + counter.toString() + " segundos.";

   }}, 1000);

}






function generate() {
   var doc = new jsPDF('p', 'pt', 'letter');
   var htmlstring = '';
   var tempVarToCheckPageHeight = 0;
   var pageHeight = 0;
   pageHeight = doc.internal.pageSize.height;
   specialElementHandlers = {
       // element with id of "bypass" - jQuery style selector  
       '#bypassme': function (element, renderer) {
           // true = "handled elsewhere, bypass text extraction"  
           return true
       }
   };
   margins = {
       top: 150,
       bottom: 60,
       left: 40,
       right: 40,
       width: 600
   };
   var y = 20;
 
   doc.setLineWidth(2);
   doc.text(200, y = y + 30, "Calculadora Tributaria Bolivia");
   doc.autoTable({
       html: '#tableF',
       startY: 70,
       theme: 'grid',
       columnStyles: {
           0: {
               cellWidth: 180,
           },
           1: {
               cellWidth: 270,
           },
           2: {
               cellWidth: 180,
           }
       },
       styles: {
           minCellHeight: 40
       }
   })
   doc.save('deuda-tributaria.pdf');
}




/*FUNCION LIMPIAR */
const clean = () =>{
   const elemento = document.getElementById("tributoO")
   elemento.innerHTML=""
   const d = document.getElementById("mantenimientoValor")
   d.innerHTML=""
   const a = document.getElementById("tributoOmitidoActualizado")
   a.innerHTML=""
   const m = document.getElementById("tasaA")
   m.innerHTML=""
   const di = document.getElementById("interes")
   di.innerHTML=""
   const deven = document.getElementById("multa")
   deven.innerHTML=""
   const ag = document.getElementById("dt")
   ag.innerHTML=""
}

/*SCRIPT TOOLTIP */
$(document).ready(function(){
   $('[data-toggle="tooltip"]').tooltip();
 });
/*script data picker spanish */ 
 $('#ingresoDate').datepicker({
   uiLibrary: 'bootstrap4',
   locale: 'es-es',
 });
 $('#retiroDate').datepicker({
   uiLibrary: 'bootstrap4',
   locale: 'es-es',
 });



//1.2 validacion general
const formulario = document.querySelector('.formulario')
formulario.addEventListener('submit',(e)=>{

if(document.getElementById("ingresoDate").value !== ""){
   clean()
}

try {

   e.preventDefault() 
   intervalo() 




var ingresoDate = document.getElementById("ingresoDate").value
var retiroDate = document.getElementById("retiroDate").value



//PRUEBAAAAAAAAAAAAAAAAAAAAAA
function parseDate(str) {
   var mdy = str.split('/');
   return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
   return Math.round((second-first)/(1000*60*60*24));
}

document.getElementById('diasMora').value = datediff(parseDate(ingresoDate), parseDate(retiroDate))
//PRUEBAAAAAAAAAAAAAAAAAA









   /* <convertimos a formato ingles> */
   let yearsIngles = ingresoDate.substring(6, 10);
   let monthsIngles = ingresoDate.substring(0,2)
   let daysIngles = ingresoDate.substring(3,5)
   var ingresoDate = yearsIngles+'/'+monthsIngles+'/'+daysIngles

   let yearsIngles1 = retiroDate.substring(6, 10);
   let monthsIngles1 = retiroDate.substring(0,2)
   let daysIngles1 = retiroDate.substring(3,5)
   var retiroDate = yearsIngles1+'/'+monthsIngles1+'/'+daysIngles1
   console.log(ingresoDate,retiroDate)    
   console.log(ingresoDate)

   function op1(){
      console.log("VOY PRIMERO")
      return new Promise ((resolve, reject)=>{
         let url = `https://test-flask-python-2022.herokuapp.com/?fecha=${ingresoDate}`  
         fetch(url)
         .then(response => response.json())
         .then(result =>{
            console.log(result.respuesta)
            document.getElementById("ufvV").value = result.respuesta
        
            resolve()
         })
         .catch(error=>{
            console.log(error)
            alert("INGRESE DATOS VALIDOS POR FAVOR")
         })

      })


   }

      


function op2(){
   console.log("VOY SEGUNDO")
   return new Promise ((resolve, reject)=>{
      let url2 = `https://test-flask-python-2022.herokuapp.com/?fecha=${retiroDate}`  
      fetch(url2)
      .then(response => response.json())
      .then(result =>{
         console.log(result.respuesta)
         document.getElementById("ufvA").value = result.respuesta
        resolve()
      })
      .catch(error=>{
         console.log(error)
         alert("INGRESE DATOS VALIDOS POR FAVOR")
      })
   

   })


}

   
 


op3()
   // CALCULO DEUDA TRIBUTARIA
async function op3(){
   await op1()
   await op2()
   console.log("VOY AL FINAL")
   

var ufvFv = document.getElementById("ufvV").value.replace(/,/g, '.')
var ufvFp = document.getElementById("ufvA").value.replace(/,/g, '.')
var to = parseFloat(document.getElementById("tributoOmitido").value)
var r = parseFloat(document.getElementById("tasaInteres").value) / 100
var dias = parseInt(document.getElementById("diasMora").value)



ufvAnt = parseFloat(ufvFv)
ufvNew =  parseFloat(ufvFp)


const too = document.getElementById("tributoO")
too.append(`Bs. ${Math.round(to)} <--- ${to} `)


const mantenimientoValor = ((( ufvNew / ufvAnt) -1) * to.toFixed(5)).toFixed(5)
const mante = document.getElementById("mantenimientoValor")
mante.append(`Bs. ${Math.round(mantenimientoValor)} <--- ${mantenimientoValor}`)





var tributoOmitidoActualizado = to + parseFloat(mantenimientoValor)
const toa = document.getElementById("tributoOmitidoActualizado")
toa.append(`Bs. ${Math.round(tributoOmitidoActualizado)} <--- ${tributoOmitidoActualizado.toFixed(5)}`)
   

const ta = document.getElementById("tasaA")
ta.append(`  ${document.getElementById("tasaInteres").value} % <--- ${r}`)




   var interes = tributoOmitidoActualizado *(((1+(r/360))** dias) -1)
   const inte = document.getElementById("interes")
   inte.append(`Bs. ${Math.round(interes)} <--- ${interes.toFixed(5)} `)


   
  
  
      if(document.getElementById('noMulta').checked){
         console.log('POR AQUI NO MULTAS')
         var deudaTributariaSinMulta = parseFloat(tributoOmitidoActualizado) + parseFloat(interes.toFixed(5))
         const deudaS = document.getElementById("dt")
         deudaS.append(`Bs. ${Math.round(deudaTributariaSinMulta)} <--- ${deudaTributariaSinMulta.toFixed(5)}`)
        
          const no = document.getElementById('multa');
          no.append("NO CORRESPONDE")
       
         
      }else if (document.getElementById('siPersonaNatural').checked){
         console.log('POR AQUI MULTA 150')
         let multaI = 150 * ufvNew
         var deudaTributariaSinMulta = parseFloat(tributoOmitidoActualizado) + parseFloat(interes.toFixed(5)) + multaI
         const deudaS = document.getElementById("dt")
         deudaS.append(`Bs. ${Math.round(deudaTributariaSinMulta)} <--- ${deudaTributariaSinMulta.toFixed(5)}`)
         
         const no = document.getElementById('multa');
         no.append(`Bs. ${Math.round(multaI)} <--- ${multaI}` )

            
      }else{
         console.log('POR AQUI MULTA 150')
          let  multaPJ = 450 * ufvNew
         var deudaTributariaSinMulta = parseFloat(tributoOmitidoActualizado) + parseFloat(interes.toFixed(5)) + multaPJ
         const deudaS = document.getElementById("dt")
         deudaS.append(`Bs. ${Math.round(deudaTributariaSinMulta)} <--- ${deudaTributariaSinMulta.toFixed(5)}`)
         
         const no = document.getElementById('multa');
         no.append(`Bs. ${Math.round(multaPJ)} <--- ${multaPJ}`)

         
      }
   
   

// var DT = deudaTributariaSinMulta 
// console.log("DT = "+ deudaTributariaSinMulta)
    
const div = document.getElementById('ufv1');
div.style.display = '';

const divv = document.getElementById('ufv2');
divv.style.display = '';

const divvv = document.getElementById('moraAwake');
divvv.style.display = '';


         




}

  
} catch (error) {
   console.log(error + "ERROR FATAL")
   alert("INGRESE DATOS VALIDOS POR FAVOR")
}




   


})
















