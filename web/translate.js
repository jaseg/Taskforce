function loadXMLDoc(dname){
	if (window.XMLHttpRequest){
		xhttp=new XMLHttpRequest();
	}else{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",dname,false);
	xhttp.send("");
	return xhttp.responseXML;
}

function displayResult(xml,xsl){
	xml=loadXMLDoc("cdcatalog.xml");
	xsl=loadXMLDoc("cdcatalog.xsl");
	if (window.ActiveXObject){
		//code for IE
		ex=xml.transformNode(xsl);
		document.getElementById("example").innerHTML=ex;
	}else{
		//code for Firefox, Opera, etc.
		if (document.implementation && document.implementation.createDocument){
			xsltProcessor=new XSLTProcessor();
			xsltProcessor.importStylesheet(xsl);
			resultDocument = xsltProcessor.transformToFragment(xml,document);
			document.getElementById("example").appendChild(resultDocument);
		}
	}
}
