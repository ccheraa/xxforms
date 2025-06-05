<xsl:stylesheet
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xx='http://www.xxforms.org/2025/xxforms'
  xmlns:xh='http://www.w3.org/1999/xhtml'
  xmlns:xf='http://www.w3.org/2002/xforms'
  xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  version='2.0' exclude-result-prefixes='xh xsl xs xx'>

  <xsl:include href="xx-functions.xsl"/>
  <xsl:include href="xx-button-group.xsl"/>
  <xsl:include href="xx-tabs.xsl"/>
  <xsl:include href="xx-menu.xsl"/>
  <xsl:include href="xx-icon.xsl"/>
  <xsl:include href="xx-html5.xsl"/>
  <xsl:include href="xx-chart.xsl"/>
  <xsl:include href="xx-theme.xsl"/>
  <xsl:include href="xx-code.xsl"/>
  <xsl:include href="xx-router.xsl"/>
  
  <xsl:template match="/">
    <xsl:apply-templates/>
  </xsl:template>
  
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>
  
  <!-- html -->
  
  <xsl:template match="xh:head">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xh:script src="/res/xx-forms.js" type="text/javascript" />
      <xh:link href="/res/xx-forms.css" type="text/css" rel="StyleSheet"/>
      <xsl:apply-templates select="/" mode="head" />
      <xsl:apply-templates select="node()"/>
    </xsl:copy>
  </xsl:template>
  
  <!-- model -->
  
  <xsl:template match="xf:model[1]">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates select="node()"/>
      <xf:instance id="xxforms">
        <data>
          <xsl:apply-templates select="/" mode="model" />
        </data>
      </xf:instance>
      <xsl:apply-templates select="/" mode="events" />
    </xsl:copy>
  </xsl:template>
  
  <!-- actions -->
  
  <!-- templates -->
  
  <!-- controls -->
  
  <xsl:template match="/" mode="head"></xsl:template>
  <xsl:template match="/" mode="style"></xsl:template>
  <xsl:template match="/" mode="model"></xsl:template>
  <xsl:template match="/" mode="events"></xsl:template>

</xsl:stylesheet>