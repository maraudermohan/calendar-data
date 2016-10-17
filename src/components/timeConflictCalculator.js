//This function duplicates the current calendar model and modifies it with conflicts
export function timeConflictCalculator(catalog, currentSelection) {
	var calenderModel = {
				'day1' : [],
				'day2' : [],
				'day3' : [],
				'day4' : [],
				'day5' : []
				};
	for(var i = 1; i < 6; i++ ) {
		calenderModel['day'+i] = catalog.map(value => {
									if((value.selected)&&(value.dayIndex.includes(i))) {
										return {id: value.id , time: value.timeIndex , leftConflicts: [] , rightConflicts:[]};
									}}).filter(value => !!value);
		var course = currentSelection.currentCourse;
		if(currentSelection.currentTask === 'Add') {
			if(course.dayIndex.includes(i)) {
				calenderModel['day'+i].push({id: course.id , time: course.timeIndex , 
									leftConflicts: [] , rightConflicts:[]});
			}
		} else {
			calenderModel['day'+i] = calenderModel['day'+i].filter(value => value.id != course.id);
		}

		calenderModel['day'+i] = modifyDayArray(calenderModel['day'+i]);
	}
	return calenderModel;
}

//Modifies calendar model, one-day at a time
function modifyDayArray(dayArray) {
	//Using quicksort to reorder the selected courses using Start-time & duration
	function quickSort(left,right) {
	    var i = left, j = right,
	        temp;
	    var pivot = dayArray[Math.floor((left+right)/2)];
	    while(i<=j) {
	      while(((dayArray[i].time[1]-dayArray[i].time[0]) < (pivot.time[1]-pivot.time[0])) || (((dayArray[i].time[1]-dayArray[i].time[0]) == (pivot.time[1]-pivot.time[0]))&&(dayArray[i].time[0] < pivot.time[0]))) i++;
	      while(((dayArray[j].time[1]-dayArray[j].time[0]) > (pivot.time[1]-pivot.time[0])) || (((dayArray[j].time[1]-dayArray[j].time[0]) == (pivot.time[1]-pivot.time[0]))&&(dayArray[j].time[0] > pivot.time[0]))) j--;
	      if(i <= j) {
	        temp = dayArray[i];
	        dayArray[i] = dayArray[j];
	        dayArray[j] = temp;
	        i++;
	        j--;
	      }      
	    }
	    if(left < j) quickSort (left, j);
	    if(i < right) quickSort (i, right);
	}

	//Compares each course's time data with the ones before it in the quick-sorted list
	//Identifies a conflict and adds it either in 'left-conflicts' or 'right-conflicts' sub array
	function identifyConflicts(currentIndex) {
	  	dayArray[currentIndex].leftConflicts=[];
	  	dayArray[currentIndex].rightConflicts=[];
	  if(currentIndex == 0) {
	    return;
	  } else {
	    for(var i=currentIndex-1; i>=0 ; i--) {
	      var durationShorter, durationLonger; 
	      if((dayArray[currentIndex].time[1]-dayArray[currentIndex].time[0]) > (dayArray[i].time[1]-dayArray[i].time[0])) {
	        durationShorter = i;
	        durationLonger = currentIndex;
	      } else {
	        durationLonger = i;
	        durationShorter = currentIndex;
	      }
	      if(((dayArray[durationShorter].time[0]>=dayArray[durationLonger].time[0])&&(dayArray[durationShorter].time[0] < dayArray[durationLonger].time[1]))
	      	||((dayArray[durationShorter].time[1]<=dayArray[durationLonger].time[1])&&(dayArray[durationShorter].time[1]>dayArray[durationLonger].time[0]))) {
	        if(durationShorter < durationLonger) {
	          dayArray[durationLonger].leftConflicts.push(...dayArray[durationShorter].leftConflicts,...dayArray[durationShorter].rightConflicts,durationShorter);
	          dayArray[durationShorter].rightConflicts.push(durationLonger);          
	        } else {
	          dayArray[durationShorter].leftConflicts.push(...dayArray[durationLonger].leftConflicts,...dayArray[durationLonger].rightConflicts,durationLonger);
	          dayArray[durationLonger].rightConflicts.push(durationShorter);
	        }
	      } 
	    }
	    var newArr=[];
	    for(var x of dayArray[currentIndex].leftConflicts) {
	      if((dayArray[x].rightConflicts.indexOf(currentIndex) != -1)&&(newArr.indexOf(x) == -1)) {
	        newArr.push(x);
	      }
	    }
	    dayArray[currentIndex].leftConflicts = newArr;
	  }
	}

	//Removing entries from right conflicts array if they donot have conflicts with each other
	function cleanupRightConflicts(index) {
	    for(var i = 0; i < dayArray[index].rightConflicts.length;i++) {
	      if ((i != dayArray[index].rightConflicts.length-1)&&([...dayArray[dayArray[index].rightConflicts[i+1]].rightConflicts,...dayArray[dayArray[index].rightConflicts[i+1]].leftConflicts].indexOf(dayArray[index].rightConflicts[i]) == -1)) {
	        dayArray[index].rightConflicts.splice(i,1);
	      }
	    }   
	}

	if(dayArray.length > 2) {
		quickSort(0,dayArray.length-1);
	}
	for(var index = 0; index < dayArray.length;index++) {
		//using for-loop instead of for..in.. loop, because typeof(index) 
		//needs to be number, not string as in for..in..
		identifyConflicts(index);
	}
	for(var index = 0; index < dayArray.length;index++) {
		cleanupRightConflicts(index);
	}
	return dayArray;
}

