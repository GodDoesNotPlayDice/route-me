import {Component} from '@angular/core';
import {
  DriverCardInfo
} from "../../shared/components/drive-card/drive-card.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor() {
    if (this.info.length === 0){
      this.error = true
    }
  }

  info : DriverCardInfo[] = driveInfoList

  error : boolean = false
  protected readonly filterButtonList = filterButtonList;
}

export interface FilterButtonData {
  name: string,
  imagen : string
}

const filterButtonList : FilterButtonData[] = [{
  name: "Comunidad",
  imagen: "https://cdn.discordapp.com/attachments/982116594543099924/1148053857335787640/community_1.png"
},
{
  name: "Eventos",
  imagen: "https://cdn.discordapp.com/attachments/982116594543099924/1148051128655814716/event.png"
},
{
  name: "Viajes",
  imagen: "https://cdn.discordapp.com/attachments/982116594543099924/1148051316388679740/travel-bag.png"
}]


const driveInfoList: DriverCardInfo[] = [
  {
    driverAvatar: {
      name: "Juan",
      url: "https://cdn.discordapp.com/attachments/982116594543099924/1148055951946027070/640px-LinuxCon_Europe_Linus_Torvalds_03_28cropped29.png"
    },
    passengerAvatars: [
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      },
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      },
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      },
      {
        name: "noseve2",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      }
    ],
    startLocation: "viña",
    endLocation: "stgo",
    date: new Date(),
    cost: 50
  },
  {
    driverAvatar: {
      name: "Fernando",
      url: "https://cdn.discordapp.com/attachments/982116594543099924/1148056114244636783/AOPolaRSwFJEGgQu8V26chPkzDVgwaq7cTXKyglLcp-oAgs900-c-k-c0x00ffffff-no-rj.png"
    },
    passengerAvatars: [
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      },
      {
        name: "noseve2",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      }
    ],
    startLocation: "viña",
    endLocation: "stgo",
    date: new Date(),
    cost: 50
  },
  {
    driverAvatar: {
      name: "Nicolas",
      url: "https://cdn.discordapp.com/attachments/982116594543099924/1148057504740298782/influencer_9989_2rdz5slp_400x400_oqd2hpij12.png"
    },
    passengerAvatars: [
      {
        name: "noseve1",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      },
      {
        name: "noseve2",
        url: "https://cdn.discordapp.com/attachments/982116594543099924/1148058714184614018/x_kb0LZN_400x400.png",
      }
    ],
    startLocation: "viña",
    endLocation: "stgo",
    date: new Date(),
    cost: 50
  }
]
