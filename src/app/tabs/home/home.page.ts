import { CommonModule } from '@angular/common'
import {
  Component,
  OnInit
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import { DriveCardComponent } from 'src/app/shared/components/drive-card/drive-card.component'
import { FilterButtonComponent } from 'src/app/shared/components/filter-button/filter-button.component'
import { SearchLauncherComponent } from 'src/app/shared/components/search-launcher/search-launcher.component'
import { DriverCardInfo } from 'src/app/shared/models/driver-card-info'
import {
  FilterButtonData,
  newFilterButtonData
} from 'src/app/shared/models/filter-button-data'
import { DriversService } from 'src/app/shared/services/drivers.service'
import { TripService } from 'src/app/shared/services/trip.service'
import { TripStateEnum } from 'src/package/trip/domain/models/trip-state'

import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_date) {
    throw new InvalidDateUserException('Invalid date')
  }
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "bad type!" };
    }
  }
  if (issue.code === z.ZodIssueCode.custom) {
    return { message: `less-than-${(issue.params || {})}` };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export const MyUserSchema = z.object( {
  user : z.string(),
  date : z.date(),
  num : z.number(),
})

type MyUserType = z.infer<typeof MyUserSchema>
export interface MyUser extends MyUserType{}

interface MyUserProps {
  user : string
  date: Date
  num: number
}

export const newMyUser = (props : MyUserProps): Result<MyUser, Error> => {
  try{
    return Ok(MyUserSchema.parse( {
        user : props.user,
        date: props.date,
        num: props.num
      }
      // , { errorMap: customErrorMap}
      )
    )
  }
  catch ( e ) {
    const err = e instanceof Error ? e : new UnknowException('From user err')
    return Err(err)
  }
}

@Component( {
  standalone : true,
  selector   : 'app-home',
  templateUrl: './home.page.html',
  styleUrls  : [ './home.page.scss' ],
  imports    : [
    IonicModule,
    CommonModule,
    SearchLauncherComponent,
    FilterButtonComponent,
    DriveCardComponent
  ]
} )
export class HomePage implements OnInit{

  constructor( private driversService: DriversService ,
    private tripService : TripService )
  {
    this.info = this.driversService.getDrivers().filter( ( driver ) => {
      return driver.state === TripStateEnum.Open
    } )

    if ( this.info.length === 0 ) {
      this.error = true
    }
  }

  ngOnInit(): void {
    const result = newMyUser({
      // date: new Date(),
      date: new Date('2021-22-22'),
      num: 2,
      user: 'pepe'
    })

    if ( result.isErr() ){
      console.log('error')
      console.log(result.unwrapErr())
    }
    else{
      console.log('ok')
      console.log(result.unwrap())
    }

    // try {
    //
    //   console.log('a')
    //   const a = z.string({ errorMap: customErrorMap }).parse(2);
    //   console.log(a)
    //
    //   // throw new MiErrorPersonalizado('Este es un error personalizado');
    // } catch (error) {
    //   // console.log('error' )
    //   // console.log(error)
    //   if (error instanceof MiErrorPersonalizado) {
    //     console.log('¡Se ha producido un error personalizado:', error.message);
    //   } else {
    //     console.log('Se ha producido un error desconocido');
    //   }
    // }
    }

  info: DriverCardInfo[] = []

  error: boolean = false

  protected readonly filterButtonList = filterButtonList
}

const filterButtonList: FilterButtonData[] = [
  newFilterButtonData( {
    name  : 'Comunidad',
    image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148053857335787640/community_1.png'
  } ),
  newFilterButtonData( {
    name  : 'Eventos',
    image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148051128655814716/event.png'
  } ),
  newFilterButtonData( {
    name  : 'Viajes',
    image: 'https://cdn.discordapp.com/attachments/982116594543099924/1148051316388679740/travel-bag.png'
  } )
]

class UnknowException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnknowException';
  }
}

abstract class MyUserException extends Error {
  protected constructor(message: string) {
    super(message);
    this.name = 'MyUserException';
  }
}

class InvalidDateUserException extends MyUserException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidDateUserException';
  }
}
