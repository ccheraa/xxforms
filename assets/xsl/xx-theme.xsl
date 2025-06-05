<xsl:stylesheet
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xx='http://www.xxforms.org/2025/xxforms'
  xmlns:xh='http://www.w3.org/1999/xhtml'
  xmlns:xf='http://www.w3.org/2002/xforms'
  xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  version='2.0' exclude-result-prefixes='xh xsl xs xx'>
  
  <xsl:template match="xx:theme">
    <xsl:variable name="name">
      <xsl:value-of select="@name"/>
    </xsl:variable>
    <xsl:variable name="mode">
      <xsl:value-of select="@mode"/>
    </xsl:variable>
    <xh:script>
      XX.theme.init(`<xsl:value-of select="$name"/>`, `<xsl:value-of select="$mode"/>`);
    </xh:script>
  </xsl:template>
 
</xsl:stylesheet>