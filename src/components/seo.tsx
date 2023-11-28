/* WIP TODO improve seo tags and get basic website info from config */

/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

interface SeoProps {
  description?: string
  title: string
  children?: React.ReactNode
}

interface SiteMetadata {
  title: string
  description: string
  author: string
}

interface SiteMetadataQuery {
  site: {
    siteMetadata: SiteMetadata
  }
}

function Seo({ description, title, children }: SeoProps) {
  const { site } = useStaticQuery<SiteMetadataQuery>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata?.description
  const defaultTitle = site.siteMetadata?.title
  const author = site.siteMetadata?.author || 'Paweł Żentała' // TODO get from config

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo
