function validateInputs()
{
var TEsearchfieldErr = "";

var TEsearchfield_= document.getElementById('TEsearchfield').value;


	
	if (TEsearchfield_== ("Type a keyword")){
		TEsearchfieldErr = "Keyword is required.\n";
	}

if (TEsearchfield_== (" ")){
		TEsearchfieldErr = "Keyword is required.\n";
	}

if (TEsearchfield_== ("")){
		TEsearchfieldErr = "Keyword is required.\n";
	}

if (TEsearchfield_== ("*")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
if (TEsearchfield_== ("!")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("@")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("#")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("$")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("%")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("^")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("&")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("+")){
		TEsearchfieldErr = "Keyword is required.\n";
	}

if (TEsearchfield_== ("-")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("_")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("/")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("\\")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("|")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("()")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("(")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== (")")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("{")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("}")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("{}")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("[")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("]")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("[]")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("is")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("the")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("for")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("or")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("with")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("why?")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("why")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("how")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
if (TEsearchfield_== ("how?")){
		TEsearchfieldErr = "Keyword is required.\n";
	}
	
	
	
if ((TEsearchfieldErr != "")) { 
	alert(" Input Error\n" + TEsearchfieldErr);

		
		if (TEsearchfieldErr!=""){
			document.getElementById('TEsearchfield').value="";
			document.getElementById('TEsearchfield').focus(); return false; }
	}
	
}