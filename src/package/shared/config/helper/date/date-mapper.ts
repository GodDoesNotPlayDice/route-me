import {
  Err,
  Ok,
  Result
} from 'oxide.ts'
import {
  RemainingUnits,
  Unit,
  UnitText
} from 'src/package/shared/config/helper/date/unit'
import {
  newValidDate,
} from 'src/package/shared/domain/models/valid-date'

export const dateFromJSON = ( utc: string ): Date => {
  return new Date( utc )
}

export const dateToJSON = ( date: Date ): string => {
  return date.toJSON()
}

export interface HourMinutes {
  hour: number
  minute: number
}

export function hourSemicolonFormat( dateUTC: Date ): Result<HourMinutes, string> {
  try {
    const validDate = newValidDate({
      value: dateUTC
    })
    const hourSemicolon = validDate.value.toJSON().split( 'T' )[1].slice( 0, 5 )
    const hourMinuteArray = hourSemicolon.split( ':' )
    const h = Number.parseInt(hourMinuteArray[0])
    const m = Number.parseInt(hourMinuteArray[1])
    return Ok( {
      hour  : h,
      minute: m
    } )
  }
  catch ( e ) {
    return Err('not a valid date to parse semicolon format')
  }
}

export const dateDifference = ( utc: string,
  unit: Set<Unit> ): Result<string, string> => {
  const currentDate = new Date()
  const otherDate   = new Date( utc )
  const remainings  = remainingUnits( currentDate, otherDate )

  const texts = textOfUnits()

  const formatedArray = combineUnits( unit, {
      days   : texts.days,
      hours  : texts.hours,
      minutes: texts.minutes,
      seconds: texts.seconds
    },
    {
      days   : remainings.days,
      hours  : remainings.hours,
      minutes: remainings.minutes,
      seconds: remainings.seconds
    } )

  if ( formatedArray.length === 0 ) {
    return Err( 'date difference parse error' )
  }

  let formatedText = formatUnitsText(
    currentDate > otherDate ? 'Hace ' : 'Faltan ', formatedArray )

  return Ok( formatedText )
}


function remainingUnits( current: Date, other: Date ): RemainingUnits {

  const milisecondsDifference = other.getTime() - current.getTime()

  const totalSeconds = Math.abs( Math.floor( milisecondsDifference / 1000 ) )
  const totalMinutes = Math.abs( Math.floor( totalSeconds / 60 ) )
  const totalHours   = Math.abs( Math.floor( totalMinutes / 60 ) )
  const totalDays    = Math.abs( Math.floor( totalHours / 24 ) )

  const remainingHours   = totalHours % 24
  const remainingMinutes = totalMinutes % 60
  const ramainingSeconds = totalSeconds % 60
  return {
    days   : totalDays,
    hours  : remainingHours,
    minutes: remainingMinutes,
    seconds: ramainingSeconds
  }
}

function combineUnits( unit: Set<Unit>, texts: UnitText,
  remainings: RemainingUnits ): string[] {
  const formatedArray: string[] = []

  Array.from( unit.values() )
       .map( unit => {
         switch ( unit ) {
           case 'Hours':
             formatedArray.push( `${ remainings.hours } ${ texts.hours }` )
             break
           case 'Days':
             formatedArray.push( `${ remainings.days } ${ texts.days }` )
             break
           case 'Seconds':
             formatedArray.push( `${ remainings.seconds } ${ texts.seconds }` )
             break
           case 'Minutes':
             formatedArray.push( `${ remainings.minutes } ${ texts.minutes }` )
             break
         }
       } )
  return formatedArray
}


function textOfUnits(): UnitText {
  const textDays    = 'Dias'
  const textHours   = 'Horas'
  const textMinutes = 'Minutos'
  const textSeconds = 'Segundos'
  return {
    days   : textDays,
    hours  : textHours,
    minutes: textMinutes,
    seconds: textSeconds
  }
}

function formatUnitsText( begin: string,
  combinedArray: string[] ): string {
  combinedArray.map( ( value, index ) => {
    if ( index !== 0 ) {
      if ( index === combinedArray.length - 1 ) {
        begin += ' y '
      }
      else {
        begin += ', '
      }
    }

    begin += value

    if ( index === combinedArray.length - 1 ) {
      begin += '.'
    }
  } )
  return begin
}
