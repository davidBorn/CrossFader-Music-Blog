var canvas = document.getElementById("scene");
var ctx = canvas.getContext('2d');
var particleArray = []; 

/*variable for mouse interactivity*/
var mouse = {
    x: undefined,
    y: undefined
}

/*mouse event listner*/
window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;


    })


function drawScene() {
    canvas.width =  png.width * 3;
    canvas.height = png.height * 3;

    ctx.drawImage(png, 0, 0);

    //*data is an array with all the pixel related data.
    var data = ctx.getImageData(0, 0, png.width *3 , png.height*3);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //*Loops through the data. Trying to find the data that corresponds with data from the logo. 
    for (var x = 0; x < data.width; x++){
        for(var y = 0; y < data.height; y++){
            var p = (x + y * data.width) * 4;
            if (data.data[p + 3] > 128) {
                var particle = {
                    x0: x,
                    y0: y,
                    x1: png.width / 2,
                    y1: png.height / 2,
                    speed: Math.random() * 6             }

                TweenMax.to(particle, particle.speed, {
                    x1: particle.x0,
                    y1: particle.y0,
                    delay: x/50,
                    ease: Elastic.easeOut
                })
                particleArray.push(particle)


            }
        }
        
    }
    requestAnimationFrame(render) 
}


var render = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particleArray.length; i++){
        ctx.fillStyle = 'rgb(233, 233, 98)';
        ctx.fillRect(particleArray[i].x1 * 3, particleArray[i].y1 * 3, 2, 2)
    }
    requestAnimationFrame(render)
}

var png = new Image();
png.onload = drawScene;
png.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAKt3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarZhpdhs7DoX/cxW9BM4gl8PxnN5BL78/UCXFshVHec9SXFRYLA64wMVFmfW//27zHz5BnDUxSck1Z8sn1lh940ext087V2fjuZ5Pitc999xvHjc8XYE23P5b8tW/6PeM91f/uOZp9KcPE9V13ejPN9o1kS/XAlf/faHgbgvYa2LTromCv1a+dthvx7K5Fvl4hHGN39f9Ywb+jF5iEJ9TdhK5Rm9FcuV38TYKdpu60T18PTbq10Sf/m/uQz178iu4YLkW3WFg+6GExtVzDeGMoW0hhcjVhuvIoOWNFX7Xu12//3y3c3Pf+gX5E6SPX+43/R+QNseg9xvhE0L50b7sd+lXv/kI6cHtw8o5P1Z+6nfOzqcz31HTv71n2XvdTtdi5sj5OtT9KOcX47pa6zyV+Qp/yRY1tn4r30JIDPxo4mSd73DVeWDcLrrpmttunXa4wRajX15ovR8+uGHoLIBR/ThwR/267SXUMAHfh4E7BHr9Yy/uLFvPcsMVFp6uGLzHMZn6yr/6mncG7T1uJi4PW7Evr5HGLhQ554x1DAMRty+jpmPg+/fzR3ENIJiOmQsHbLbrDMDfk/vlXOEAHRiYaG8B7GReE2AidpDYjAsgYLMLyWVnxXsjzmHIAkCNrfsQfQcWl5KfbNLHEDLgEAWszTPizlCf/K0bIgSIFLIJAjY1NMCKMeE/Egs+1FJIMaWUk6SSamo5ZI2wnCUrozYJEiVJFpEiVZopocSSSi5SSqmlVV8DjJsq8VhLrbU1Fm3M3Hi6MaC17nvosaeeu/TSa2/DmxFGHGnkIaOMOtr0M0zieOYps8w623ILV1pxpZWXrLLqahtX22HHnXbessuuZrcHahesX75/gZq7UPMHKR0oD9ToFblP4ZROkmIGYj46ABdFwAXjvWJmi4vRK3KKma1KhMmzyaTgTKeIgWBczqftHtj9Qi6ZkH8GNwMQ/ieQMwrdG8h9xe0VarOdRBcOQhqGalQbiL7tcvOFf2TM71tj3xz47yZqYedZw+6tblDCVSb2d7vnUfeccY9CRJ4h5o0x3w2xfnuQtM24FHxcKh/SApu+dsdTra0r8rj+2mnVIHPKHtvz9OlrO1qXM5uefa2+l5HqZYnenADb1+xetqSwYRSYqH05X3g9xLwx5q0h5memqcH8xTSd4CTa64ZmbahrRjXWBbL5gvooDWtxVbWmvb9aVR6EokXp1LB6EkKAeLUEzzZjkCYXvt4kQgqFaC1jp7GJ/qQCLvFP9UJascMQJXrWm7NUn9vgJqKI7OrNtEvVrYRVk5sZkQP0VcDUEWNIoJAqqOfpiGPoI7upE4f8abfm8/a1bTMR1hBX6OQVV3wvYWbOTahnXbgXZHJZyJW2potlDMi/pUqXSurEFCWNsRfLNuYodkU3Utov7OW79z2t7i8Dm5uFgYCYH03lCsdYC93eeshpr47a6f3C8cxRWq4zezfZgTR2ZXcXI3uGAHsL5NWbenjZhWgIu6aoftDERWislQDREGJjR5ivlVk40Zh7rb2TS8qQivnq3cc5OuwlTTZmcq3Bj6iWwHghHuExtnPAjR/xvLXm/Ei5zTZhXA4F0j7A7WoH7ayhz5GDFWLT4yVHySMSSBcMRCUkz3GsOU/gCrB+Kiw/x8wSJ3zcpONSEsf0eBUjuB3XWBQhqNCpvtV2qnqNWtScrQHZvc0x5T7z0+7JFRMBb/NeHNK5jYNAOTvXvTDAwqimMnUqV4AgPaAUeN71bfeCxVLsEhQCMvFUFDDzseotjNB8pHSPxxsmQV4uzsp9vL5tgaaaA811Jmi16qGRj1lLsgosRViA/N/3xAlcjnOhIXFcksVkP77Pz+ekxbz4M6htAmRAtG30h5v7WMjnESxMQhxz4pORjjAgcT+ZXjPVaI8AGCS1HHyXPBAFnMzjnWRlA4nnoO7pn/z/OD/XV+nlFdE0Q3aU3Rrx5IAkRd+ee5Tj78PH7PXy/Xz5vkrEkw4MaTrIcnu05z39pq1tZogFDekGmgLNArPhS0LQ9o5PyKAscGNTXWD18ctjcdix6xLMQhqvCIFI2UDqqQWRoLVAHdk3b14yxF9baE/zMxYaYr5YqCn1YYQ0B7LH1SFJOWihiuLskZGoMBxhkIuZiqV8tA3UAkFjB5pNQ0JkjW51DQIDycaKJ2RIUk7vU4cp4feyyFXEPtNQF9Tstlkop5bL7lh4s08EViQ8Wj0RJj4gFc6BkBSvevVFyMZ7YUhOjpYLt63cNuJ0UG4RDXZ7gCdXYIGvfdTm0nOpRoUpmcaqabTehr7ReVwkr00qhA6Ig/JSQV0MIGpd84fkcHviiXmqLtcRRQvd2bBMQjiR+4+C6heF5XyH8wOatakAwuJ659DUxY/cVeHO8QJ+RNLxpbYsHmBR91kIg6BksL0ldRTkdl4aHbsPrQVIA7nAO/Cscik5BGtNo0Pazv3Ggr7umyFbn1SgHOaghPFcZ0PIYCQbp0MJcGtGHutgbqlp1x+i9N24MS8CZ0xWa+SxtSaJqnpXZVRKEuibRLf6SZuXVZMamALH9HAcV99FLNUuPcGPlBOuki3whEoiLx23xnB7obeiVjqQvNiJRlBrkETJIgixGovSs77bcItiRwmZsEXRBJe1CAhsy0Yhf7WOwR0kAk4ZmFYszDiQJoasuqIo97v8HFcCBYDI5oQUMUHxuKNxYaHqAzRENZXJ6VXqeNne8ibXL4mf05p6Jd6vT7qGpdNKJAzMgDCgemIvNQNeo3tyDIjFa1UYERGoL9H838EhImMbUXC8qh2pm26ksvfROMQzHbMp62n/KrmFSsWVDdaCexuSdA53kPWItuaoUKkRt76ZyNR4raZZeu/BrRZXrppPc083xlQvNc9uqu8f2dPU0ltGE5yJgIJ8LIp2WUleq19wU26c8FDth4ZKM8pDQQ4P6Qg7qXKU8xAeSnn+UN68UV7S10fM0DK5FfZE+RDncfsfyyK05vqh5bRQdsHEEYlAyU6ZjNqOaDfN//AL8KLMo8pJivhox5KCoPg00T2NfqF6VUj4OzMRTC88Fm85rmnUbbG8UNMcppZz0zu8vWeNWzgtqohVC0q/DdNBn4aYx5i0ljLWrNFSaurrXuLtfR83v5z8lY/DmrjO8IUatOOinBNVQDlSR8ol6gtfWAJXI68VXJJnur4NdHahqcNE2nmM6yIOedk8lKHLhbgeo5AiFfGLDCcNGHRYrC2+VjB/wQbmMx38UzYwn+ngo6WOhTpKCSrLBU/LoaSTohkUnm1hNL88ex+FImg9G0N1cRjLo9SQDZ3gsuxFACJn1WMUx7UhYjFUorYURKxPL2jravH536Yt827e+lPaMm9GKm6LiFpk6MDGYaJcsSPR46vSQBlmHXrMH33ruFY6ZEhZhPnIMpFuLYvU4yjgMBapyVPfAs9QTzIj3TzJ1aKmC+q03xrq2WAPTzKfE8vNWHcCfcGfvzGY+QeJ/t62vPNErpDhhejXErYuTTBKAhE1mvQdCWoR95FZEHtre1mUK/ubIeaNMW8NMX85Tc0zU4PYAWtjx61vQjwKZRH9+EaM5DQyISyTqhqA5PFxGlIJc1BTYv8x9R3alyHmjTFvDTE/MY2e28Q3fO+d9kcmwpW3mZXI/T9P+2yPsO29eQAAAAZiS0dEABcAFwAXsTnA3wAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+IMHwY2A05KBpwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAH/klEQVR42u2dXWwcVxXHf3d2N26atdMk3Z21RaCAK+RWLWpSFV5QUEFQhEpNEapAiI9KPCAh8UZVpSUbpYpoX4AHRF8gECFoUSiorWipFGjSFpEKIr5SE9URkNT2ztqK69TOlz17eJi7ZbyeOzu7Xi+zs3Mky9bs3Nk7vz33nHPv3vlb2bYtRDMBloEVYADIkGwTYAG4FtgUtZHVwsWXgFPAMeCchptkmKeAA8CvgUtRG2ZbgHkS+ClwBrgL+DTwLiCXYJjPAM8DLjAObG7WOJPP58sRYR4CntNAp/SHMQIMJmj4+2E+DVwG5oAJoAiMNnOgMKCNMJ8HZoGrOrbMJAxqEMy6RYZqAmqC6erXVxIGNQxmS1CDgDaDScKgRoFZt/P69w1AISgHWW3CrNtl4DTwM+Ap4D89lv1bgWkBu4Gv6GR8Mij7K18dGgSzCtQiVgvXA7cAY8DWNjy1vE445TZgzuoy8LQecWEwbwf2AXt0m0PAvY3Zvw7U6JmO49DPZtt2EMz9wJ+B9wEP+aFm2xjmbdnw8PDtInKniOwGdohITik1D7ymlHq5Uqm80MRL4gTzT3rkTgCP6NPHgc1ZHfNe10X7bzsNs1QqfVhEHq3VanesijVK1f+8R0SwbfuciBysVquP9wjMetioQ80A45b2ioou2Bc6CbNYLO4TkaPAHRFO36mU+oFt288WCoV8D8D0x+J/ASeAi5Ze6BjT08kbgWs61KlvKKXKLawX1O2TlmUdBlTcYDqOE5SgrwHu1tl/ayafz+8HtgDDOqbOaE9dAVhaWmq5U4VC4Tal1JE2YNZtbHBwcG5xcfHVuMHM5/ONMD8FPAzcDKj6Ded0bXUv8Hmdvdr2VMuy9q23wBeRB0dHRwdi7pmrYDauNvmhoov1U61m3kKhcKN+I5MdE5HfKaUWdGy9zwB/5MKFC/cBh3sFZtDyXSPU7+iEFdkymczHRMQU/x51HOdBHcjrN/MEcISARVzLsj660UDbgJk1wcQQ4/xQb2mjj3cahvAbjuPs9cMEcBznGeCXhjZ7YgYTHQ4DYRKSNOpQx9qIfbcGHVdK/SSkJPuR4fg7t2/fPhQjmOhzbzZVIWFZOKfn5K3aDgPoCeNCQDb7T2MncrkdMYKJXmVSYZP+0JDYYl8zwHUGD50xNZqamnIaQ4Evju6IEUya1cdWJzu7bdu2vOkNa7XafEjTZeAtQ7utMYLZvGTsVp2nlGrW4fOGqmG+V2B2FWgE+15A3D0+PT39l16BGVSH/t/McZzvlkqlP4jI+0XEAmYLhcKz1Wq11iswYwUUoFKpvAq8PX+vVqv0Esy4DflOl0YKuLWbMBMNVN/bTuA93YIZuyHf4Zjs2rZ9DPgm3l6sv200zKR7KI7jXAB+A/y1GzAT7aF+T+3m+zUDWo5hsjkgIl9uazha1sOVSuXH6+xCWSe6xHjodUqpd7TZdks65A0mIl8cGhr6RSttJicnV1Kg5rWBq5OTk1fi1q9YAR0ZGbleRMZExFJKVWdmZiZ6sfiNhRWLxXHXdc/VarXjIvJirVZ7zbbtH6ZA2x/CB1n71fX9pVLpphRocBJpthNkxNBuuG+Bzs/PXzQG62x2qEk/TPuZFvvZQ5eBCwZPs0OS0XYM31/VarXz/T7kTQBuMDVwXbdkem3Tpk19D/SM4fjnQtrcYzi+MDU1Nd/vQH9vGPK3FYvFzwQM92uBrxqudZxoe/wTXdgf5X/bpBtLoydt2/62UuqoZVkLruvudl33AbxdKkEfwou9Vod2HKjjOH8sFosnlVK7Al7OAHtFZK/rNl1VW8pms4d7DeiG1KF65/J6r/H49PT0XAqUt3fUHVrHJf7hum6ZHrQNmykNDg5+DXihjab/FpHx2dnZxRSozyYnJ684jvMJpdR+wh/58+UgOTIwMLCrWq2eoUetGdD1DrtapVIpZzKZnUqpB0TkOWAa7xnJZbwnfF8RkccymcxN1Wr1s2fPno173Vnudtm0xnRyeUz/dMqe0NvJW0l0X69UKt/vtTq0W3YRTwwhsonI1Y3uVC8Dvd9xnCf7Yaa0xvSmrSFg0XGcFRJsVpdg1nfAfcS27URvrsh2EeaH9OETwJuph64P5h7gJeDnGBagU6CtwezadsLEAe1nmB0H2u8wOwo0hRkNqKQw15jbLtC6rlEKc7UtECL2ZYXArGuFpjBX2wQhCmpWCMwDeIpbKczV9ndCZOmsEJhPY5DH6PMENEeI1p8VAvNyCjPQVggRULRSmG2ZUZXSSmF2BOqv8GSUXUuXAYfwBJxTmK1DfR1PgHECuGLh6bR/AHg3AWoMKcxQy+DpsrwXKAFZC08v6W48HcyxBqhxhPmmiLxBC9ryGwizAHwc+AKebmDOr3B7CU8E/xHtvir1zMDw54d5F56I4C68h8qUf8V+M56oKMBBfcK3CJB71BdttCyeSNQemkjxGKy8zntttb2r88eELtbniCZLZ5lgwmoNZnye+hLeExm7CdfOrJtRCy7mtqxLnqd0tj5N+C6XTBhMCJZdz+Ft396JJ1fxUEJh1gEN4j2Bskbqs1WYYYsjGX3iZTx9ZkkgTL8DNZP6jATT5KF+2CP6QhM6xiQNZhRPjQyzGdD6pzeK9+8a/FCTBDMM6lt4Wn6RYEYBGgR1MYEwg6DmdMj7IPClKDBNWd5kl/T09IT+tJIGszH7T2kHKumifUuU+20FKHi73S7q6VZSYfrr1Ct6+Oei3u9/AWy0s+5pqV30AAAAAElFTkSuQmCC";