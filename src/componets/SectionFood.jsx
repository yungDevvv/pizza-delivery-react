import React from 'react'
import FoodCard from './FoodCard/FoodCard'
import Media from 'react-media';
import MobileFoodCard from './MobileComponents/MobileFoodCard/MobileFoodCard';


function SectionFood({ error, notify, foodData, isLoading }) {


  return (
    <section className='section-food'>
      {error
        ? <h1 style={{fontSize: '20px'}}>Something goes wrong :(</h1>
        : <div className={isLoading ? 'section-food_novisible' : 'section-food_visible'}>
          <Media queries={{
            tablet: "(max-width: 950px)"
          }}>
            {matches => (
              <>
                <h1>Pizza</h1>
                <div id="pizza" className='food-row'>
                  {isLoading
                    ? null
                    : matches.tablet
                      ? foodData.pizza.map(item => <MobileFoodCard notify={notify} key={item.id} item={item} />)
                      : foodData.pizza.map(item => <FoodCard key={item.id} item={item} />)
                  }
                </div>
                <h1>Snacks</h1>
                <div id="snacks" className='food-row'>
                  {isLoading
                    ? null
                    : matches.tablet
                      ? foodData.snacks.map(item => <MobileFoodCard notify={notify} key={item.id} item={item} />)
                      : foodData.snacks.map(item => <FoodCard key={item.id} item={item} />)
                  }
                </div>
                <h1>Dessert</h1>
                <div id="desserts" className='food-row'>
                  {isLoading
                    ? null
                    : matches.tablet
                      ? foodData.desserts.map(item => <MobileFoodCard notify={notify} key={item.id} item={item} />)
                      : foodData.desserts.map(item => <FoodCard key={item.id} item={item} />)
                  }
                </div>
                <h1>Drinks</h1>
                <div id="drinks" className='food-row'>
                  {isLoading
                    ? null
                    : matches.tablet
                      ? foodData.drinks.map(item => <MobileFoodCard notify={notify} key={item.id} item={item} />)
                      : foodData.drinks.map(item => <FoodCard key={item.id} item={item} />)
                  }
                </div>
                <h1>Coffee</h1>
                <div id="coffee" className='food-row'>
                  {isLoading
                    ? null
                    : matches.tablet
                      ? foodData.warmdrinks.map(item => <MobileFoodCard notify={notify} key={item.id} item={item} />)
                      : foodData.warmdrinks.map(item => <FoodCard key={item.id} item={item} />)
                  }
                </div>
              </>
            )}
          </Media>

        </div>
      }

    </section>
  )
}

export default SectionFood