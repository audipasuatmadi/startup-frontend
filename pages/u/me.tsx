import React from 'react'
import Link from 'next/link';
import EditArticleCard from '../../components/cards/EditArticleCard';

//TODO: remove this
const names="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem consequatur...".split(" ");
const me = () => {
  return (
    <section className="mt-20 px-8 flex flex-col gap-5 md:mx-32 lg:mx-64">
      <header className="font-bold text-xl text-brand">Articles</header>
      {/* TODO: remove below */}
      {
        names.map((val, key) => (
          <EditArticleCard 
            key={key}
            id={1}
            name={val}
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa mollitia, velit saepe, voluptatibus vero voluptatum, laborum nesciunt explicabo eveniet quas animi rerum? Vitae totam, alias minima cumque praesentium assumenda ipsam."
          />
        ))
      }
    </section>
  )
}

export default me
