<xsl:stylesheet
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xx='http://www.xxforms.org/2025/xxforms'
  xmlns:xh='http://www.w3.org/1999/xhtml'
  xmlns:xf='http://www.w3.org/2002/xforms'
  xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  version='2.0' exclude-result-prefixes='xh xsl xs xx'>
  
  <xsl:import href="xx-functions.xsl"/>
  
  <!-- style -->
  
  <xsl:template match="/" mode="style" priority="10">
    <xsl:if test="exists(//xx:menu)">
      <style>menu</style>
    </xsl:if>
    <xsl:next-match />
  </xsl:template>
  
  <!-- model -->
  
  <xsl:template match="/" mode="model" priority="10">
    <xsl:for-each select="//xx:menu">
      <menu>
        <xsl:element name="{xx:id(.)}">
          <open>false</open>
        </xsl:element>
      </menu>
    </xsl:for-each>
    <xsl:next-match />
  </xsl:template>
  
  <xsl:template name="menu">
    <xsl:param name="id" />
    <xsl:choose>
      <xsl:when test="exists(xx:menu-label)">
        <div class="xx-button">
          <xsl:apply-templates select="xx:menu-label/node()" />
          <div class="xx-menu" id="{$id}">
            <xsl:apply-templates select="* except xx:menu-label" />
          </div>
        </div>
      </xsl:when>
      <xsl:otherwise>
        <div class="xx-menu{if(@bar='true') then ' menu-bar' else ''}" id="{$id}">
          <xsl:apply-templates select="* except xx:menu-label" />
        </div>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template name="menu-trigger">
    <xsl:param name="for" />
    <div class="xx-menu-trigger">
      <xsl:attribute name="for" select="$for" />
      <xsl:apply-templates select="*" />
    </div>
  </xsl:template>
  
  <!-- controls -->
  
  <xsl:template match="xx:menu">
    <xsl:variable name="id" select="(@id, xx:id(..))[1]" />
    <xsl:call-template name="menu">
      <xsl:with-param name="id" select="$id" />
    </xsl:call-template>
  </xsl:template>
  
  <xsl:template match="xx:menu-trigger">
    <xsl:call-template name="menu-trigger">
      <xsl:with-param name="for" select="@for" />
    </xsl:call-template>
  </xsl:template>
  
  <xsl:template match="xx:separator">
    <div class="xx-separator" />
  </xsl:template>
 
</xsl:stylesheet>