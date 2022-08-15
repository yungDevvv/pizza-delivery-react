import React, {useMemo} from 'react'

export const useSearchedItems = (cities, inputValue) => {
  const searchedItems = useMemo(() => {
      return cities.filter(city => city.toLowerCase().split(' ').join('').includes(inputValue.toLowerCase().split(' ').join('')))
   }, [inputValue])
   return searchedItems
}
