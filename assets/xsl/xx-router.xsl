<xsl:stylesheet
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xx='http://www.xxforms.org/2025/xxforms'
  xmlns:xh='http://www.w3.org/1999/xhtml'
  xmlns:xf='http://www.w3.org/2002/xforms'
  xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  version='2.0' exclude-result-prefixes='xh xsl xs xx'>
  
  <xsl:template match="/" mode="model" priority="10">
    <route>/</route>
    <xsl:next-match/>
  </xsl:template>

  <xsl:template match="/" mode="head" priority="10">
    <xsl:if test="//xx:router">
      <xh:script>
        XX.router.init();
      </xh:script>
    </xsl:if>
    <xsl:next-match/>
  </xsl:template>

  <xsl:template match="xx:link">
    <xsl:variable name="route" select="@route"/>
    <xf:trigger appearance="minimal">
      <xf:label>
        <xsl:apply-templates select="node()"/>
      </xf:label>
      <xf:setvalue ref="instance('xxforms')/route" value="{$route}" ev:event="DOMActivate"/>
      <xf:dispatch name="xx-route-changed" ev:event="DOMActivate" targetid="{//xf:model[1]/@id}">
        <xf:property name="route" value="{$route}"/>
      </xf:dispatch>
    </xf:trigger>
  </xsl:template>

  <xsl:template match="xx:go-to">
    <xsl:variable name="route" select="@route"/>
    <xf:setvalue ref="instance('xxforms')/route" value="{$route}" ev:event="{@ev:event}"/>
    <xf:dispatch name="xx-route-changed" ev:event="{@ev:event}" targetid="{//xf:model[1]/@id}">
      <xf:property name="route" value="{$route}"/>
    </xf:dispatch>
  </xsl:template>
 
</xsl:stylesheet>