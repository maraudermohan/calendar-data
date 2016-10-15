import initialState from './initialState';

export default function timeIndexReducer(state = initialState.timeIndex, action) {
  switch (action.type) {
  	case 'PICK_COURSE_TO_SELECT_OR_DESELECT':
    	return Object.assign({},state,{
    							currentCourse : action.content,
    							currentTask : action.task 
    						});

    case 'REMOVE_COURSE_FROM_SELECTION':
    	return Object.assign({},state,{
    							currentCourse : '',
    							currentTask : '' 
    						});

    case 'ADD_COURSE_TO_SELECTION':
    	var obj = {currentCourse : '',
    				currentTask : '' };
    	for(var index of action.content.dayIndex) {
    		obj['day'+index] = organizeTimeConflict(state['day'+index].concat({id: action.content.id, time:action.content.timeIndex}));
    	}
    	return Object.assign({},state,obj);

    default:
      return state;
  }
}

function organizeTimeConflict(timeArray) {
	function quickSort(left,right) {
	    var i = left, j = right,
	        temp;
	    var pivot = timeArray[Math.floor((left+right)/2)];
	    while(i<=j) {
	      while(((timeArray[i].time[1]-timeArray[i].time[0]) < (pivot.time[1]-pivot.time[0])) || (((timeArray[i].time[1]-timeArray[i].time[0]) == (pivot.time[1]-pivot.time[0]))&&(timeArray[i].time[0] < pivot.time[0]))) i++;
	      while(((timeArray[j].time[1]-timeArray[j].time[0]) > (pivot.time[1]-pivot.time[0])) || (((timeArray[j].time[1]-timeArray[j].time[0]) == (pivot.time[1]-pivot.time[0]))&&(timeArray[j].time[0] > pivot.time[0]))) j--;
	      if(i <= j) {
	        temp = timeArray[i];
	        timeArray[i] = timeArray[j];
	        timeArray[j] = temp;
	        i++;
	        j--;
	      }      
	    }
	    if(left < j) quickSort (left, j);
	    if(i < right) quickSort (i, right);
	}

	function identifyConflicts(currentIndex) {
	  	timeArray[currentIndex].leftConflicts=[];
	  	timeArray[currentIndex].rightConflicts=[];
	  if(currentIndex == 0) {
	    return;
	  } else {
	    for(var i=currentIndex-1; i>=0 ; i--) {
	      var durationShorter, durationLonger; 
	      if((timeArray[currentIndex].time[1]-timeArray[currentIndex].time[0]) > (timeArray[i].time[1]-timeArray[i].time[0])) {
	        durationShorter = i;
	        durationLonger = currentIndex;
	      } else {
	        durationLonger = i;
	        durationShorter = currentIndex;
	      }
	      if(((timeArray[durationShorter].time[0]>=timeArray[durationLonger].time[0])&&(timeArray[durationShorter].time[0] < timeArray[durationLonger].time[1]))
	      	||((timeArray[durationShorter].time[1]<=timeArray[durationLonger].time[1])&&(timeArray[durationShorter].time[1]>timeArray[durationLonger].time[0]))) {
	        if(durationShorter < durationLonger) {
	          timeArray[durationLonger].leftConflicts.push(...timeArray[durationShorter].leftConflicts,...timeArray[durationShorter].rightConflicts,durationShorter);
	          timeArray[durationShorter].rightConflicts.push(durationLonger);          
	        } else {
	          timeArray[durationShorter].leftConflicts.push(...timeArray[durationLonger].leftConflicts,...timeArray[durationLonger].rightConflicts,durationLonger);
	          timeArray[durationLonger].rightConflicts.push(durationShorter);
	        }
	      } 
	    }
	    var newArr=[];
	    for(var x of timeArray[currentIndex].leftConflicts) {
	      if((timeArray[x].rightConflicts.indexOf(currentIndex) != -1)&&(newArr.indexOf(x) == -1)) {
	        newArr.push(x);
	      }
	    }
	    timeArray[currentIndex].leftConflicts = newArr;
	  }
	}

	function cleanupRightConflicts(index) {
	    for(var i = 0; i < timeArray[index].rightConflicts.length;i++) {
	      if ((i != timeArray[index].rightConflicts.length-1)&&([...timeArray[timeArray[index].rightConflicts[i+1]].rightConflicts,...timeArray[timeArray[index].rightConflicts[i+1]].leftConflicts].indexOf(timeArray[index].rightConflicts[i]) == -1)) {
	        timeArray[index].rightConflicts.splice(i,1);
	      }
	    }   
	}

	if(timeArray.length < 3) {  
		return timeArray;
	}
	quickSort(0,timeArray.length-1);
	for(var index = 0; index < timeArray.length;index++) {
		//using for-loop instead of for..in.. loop, because typeof(index) 
		//needs to be number, not string as in for..in..
		identifyConflicts(index);
	}
	for(var index = 0; index < timeArray.length;index++) {
		//using for-loop instead of for..in.. loop, because typeof(index) 
		//needs to be number, not string as in for..in..
		cleanupRightConflicts(index);
	}
	return timeArray;
}
