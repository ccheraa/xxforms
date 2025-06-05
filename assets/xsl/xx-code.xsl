<xsl:stylesheet
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xx='http://www.xxforms.org/2025/xxforms'
  xmlns:xh='http://www.w3.org/1999/xhtml'
  xmlns:xf='http://www.w3.org/2002/xforms'
  xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  version='2.0' exclude-result-prefixes='xh xsl xs xx'>
  <xsl:output method="xml" indent="yes" cdata-section-elements="xh:codes"/>

  <xsl:template match="/" mode="head" priority="10">
    <xh:link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/speed-highlight/core@1.2.7/dist/themes/github-dark.css"/>
    <xsl:next-match />
  </xsl:template>

  <xsl:template match="xx:code">
    <xsl:variable name="lang">
      <xsl:value-of select="@lang"/>
    </xsl:variable>
    <xh:code>
      <xsl:attribute name="class" select="concat('shj-lang-', $lang)" />
      <xsl:copy select="node()">
        <xsl:apply-templates select="node()"/>
      </xsl:copy>
    </xh:code>
  </xsl:template>
 
</xsl:stylesheet>