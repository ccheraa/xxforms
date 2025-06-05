<xsl:stylesheet
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xx='http://www.xxforms.org/2025/xxforms'
  xmlns:xh='http://www.w3.org/1999/xhtml'
  xmlns:xf='http://www.w3.org/2002/xforms'
  xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  version='2.0' exclude-result-prefixes='xh xsl xs xx'>

  <xsl:template match="xx:audio">
    <xh:audio controls="controls">
      <xsl:attribute name="src">{<xsl:value-of select="@src" />}</xsl:attribute>
    </xh:audio>
  </xsl:template>
  
  <xsl:template match="xx:video">
    <xh:video controls="controls">
      <xsl:attribute name="src">{<xsl:value-of select="@src" />}</xsl:attribute>
    </xh:video>
  </xsl:template>

</xsl:stylesheet>