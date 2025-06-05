<xsl:stylesheet
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xx='http://www.xxforms.org/2025/xxforms'
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  version='2.0' exclude-result-prefixes='xsl xs xx'>
  
  <xsl:function name="xx:id" as="xs:string">
    <xsl:param name="input" as="node()"/>
    <xsl:value-of select="($input/@id, generate-id($input))[1]"/>
  </xsl:function>

</xsl:stylesheet>