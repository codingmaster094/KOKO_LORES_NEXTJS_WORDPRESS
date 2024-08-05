import React from 'react'

const PageContent = ({initialContent}) => {
    const content = initialContent
  return (
    <section className="dem-text bg-color text-white ">
            <div className="container">
                <div
                    className="dem-text-wrapper pt-36 xl:pt-48 2xl:pt-60 pb-10 md:pb-16 lg:pb-24 flex flex-col lg:gap-6 gap-4">
                    <h1>{content.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: content.content }}/>
                </div>
            </div>
        </section>
  )
}

export default PageContent