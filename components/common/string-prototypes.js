
String.prototype.isEmpty =function() { return !this.match(/\S/);  }
Date.prototype.formatDate = function(date) {
    let _y=date.getFullYear();
    let _m=date.getMonth()+1;
    _m=_m>=10?_m:'0'+_m;
    let _d=date.getDate();
    _d=_d>=10?_d:'0'+_d;
    return _y+'-'+_m+'-'+_d;
};
Date.prototype.formatDateTime = function() {
    let date=this;
    let _y=date.getFullYear();
    let _m=date.getMonth()+1;
        _m=_m>=10?_m:'0'+_m;
    let _d=date.getDate();
        _d=_d>=10?_d:'0'+_d;
    let _h=date.getHours(); 
    _h=_h>=10?_h:'0'+_h;
    let _mm=date.getMinutes();        
    _mm=_mm>=10?_mm:'0'+_mm;
    return _y+'-'+_m+'-'+_d+' '+_h+':'+_mm;
}; 
