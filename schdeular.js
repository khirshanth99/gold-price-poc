



function generateArr(){
	items.map((ele,i) => {
		let filename = ele?.curr; 
			console.log(filename)
			fs.writeFile(`Data10Seconds/${filename + '-XAU'}.txt`,'', (err,res) => {
		    if(err) console.log(err);
		    console.log(res);
		    });
			fs.writeFile(`Data10Seconds/${filename + '-XAG'}.txt`,'', (err,res) => {
				if(err) console.log(err);
				console.log(res);
				});
	})
}
generateArr()