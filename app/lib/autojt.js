define(['underscore'],function(_){
	
	function generate_xml(iArg)
	{
		var datas = {};
		_.each(iArg,function(value,id){
			datas[id] = Math.floor(value/20);
		});
		console.log(datas);
		return "<!-- -->";
	};

	return {
		getStupeflixXML:generate_xml
	};
});