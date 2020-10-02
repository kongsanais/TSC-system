<template>
  <div>
<div id="ten-countdown">Quiz Time : {{temp_time}}</div>
  </div>
</template>

<script>
export default {
props: ['time'],
data() {
    return {
        temp_time: null,
        msLeft:null,
        endTime:null
    }
},
mounted() {
    this.countdown(this.time,0)
},
methods: {
countdown(minutes,seconds)
  {
    this.endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    this.updateTimer(this.endTime);
},
twoDigits(n)
{
        return (n <= 9 ? "0" + n : n);
},
updateTimer()
{  
   var time , hours , mins; 

   this.msLeft = this.endTime - (+new Date);
  
        if ( this.msLeft < 1000 ) {
            this.temp_time = "Time Out"
        } else {
            time = new Date(this.msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            this.temp_time = (hours ? hours + ':' + this.twoDigits( mins ) : mins) + ':' + this.twoDigits( time.getUTCSeconds() );
            setTimeout(this.updateTimer, time.getUTCMilliseconds() + 500 );
        }
}
},

}
</script>

<style scoped>
div {
    /* text-align: center; */
    display:inline;
    padding: 5px;
    font-family: Verdana, sans-serif, Arial;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
}

body {
  padding: 20px;
  text-align: center;
}
</style>>

</style>