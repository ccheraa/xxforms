<xsl:stylesheet
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xx='http://www.xxforms.org/2025/xxforms'
  xmlns:xh='http://www.w3.org/1999/xhtml'
  xmlns:xf='http://www.w3.org/2002/xforms'
  xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  version='2.0' exclude-result-prefixes='xh xsl xs xx'>
  
  <!-- style -->
  
  <xsl:template match="/" mode="style" priority="10">
    <xsl:if test="exists(//xx:button-group)">
      <style>button-group</style>
    </xsl:if>
    <xsl:next-match />
  </xsl:template>

  <!-- model -->
  
  <!-- controls -->
  
  <xsl:template match="xx:button-group">
    <div class="xx-button-group">
      <xsl:apply-templates select="*" />
    </div>
  </xsl:template>
 
</xsl:stylesheet>