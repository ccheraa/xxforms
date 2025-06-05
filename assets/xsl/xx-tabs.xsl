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
    <xsl:if test="exists(//xx:tabs)">
      <style>tabs</style>
    </xsl:if>
    <xsl:next-match />
  </xsl:template>
  
  <!-- model -->
  
  <xsl:template match="/" mode="model" priority="10">
    <xsl:for-each select="//xx:tabs">
      <tabs>
        <xsl:element name="{xx:id(.)}">
          <tab-index>
            <xsl:value-of select="(xx:tab-header[1]/@tab-index, 1)[1]"/>
          </tab-index>
        </xsl:element>
      </tabs>
    </xsl:for-each>
    <xsl:next-match />
  </xsl:template>

  <!-- events-->
  
  <xsl:template match="/" mode="events" priority="10">
    <xsl:for-each select="//xx:tabs/xf:*[@ev:event='xx-tab-changed']">
      <xsl:copy>
        <xsl:copy-of select="@* except @ev:event" />
        <xsl:attribute namespace="http://www.w3.org/2001/xml-events" name="event" select="concat('xx-tab-changed_', xx:id(..))" />
      </xsl:copy>
    </xsl:for-each>
    <xsl:next-match />
  </xsl:template>

  <!-- actions -->
  
  <xsl:template match="xx:set-tab-index">
    <xf:setvalue>
      <xsl:copy-of select="@* except(@id | @value)" />
      <xsl:attribute name="ref" select="concat('instance(''xxforms'')/tabs/', @id, '/tab-index')" />
      <xsl:attribute name="value" select="@value" />
    </xf:setvalue>
  </xsl:template>
  
  <!-- templates -->
  
  <xsl:template name="tab-header">
    <xsl:param name="id" />
    <xsl:param name="tab-index" />
    <xsl:param name="tab-index-to-set" />
    <xsl:param name="title" />
    <div class="xx-tab-header{{if(instance('xxforms')/tabs/{$id}/tab-index = {$tab-index}, ' active', '')}}">
      <xf:trigger appearance="minimal">
        <xf:label>
          <xsl:apply-templates select="$title" />
        </xf:label>
        <xf:action ev:event="DOMActivate" if="not(instance('xxforms')/tabs/{$id}/tab-index = {$tab-index})">
          <xf:setvalue ref="instance('xxforms')/tabs/{$id}/tab-index" value="{$tab-index-to-set}" />
          <xf:dispatch name="xx-tab-changed_{$id}" targetid="{//xf:model[1]/@id}">
            <xf:property name="id" value="'{$id}'"/>
            <xf:property name="tab-index" value="instance('xxforms')/tabs/{$id}/tab-index"/>
          </xf:dispatch>
        </xf:action>
      </xf:trigger>
    </div>
  </xsl:template>
  
  <xsl:template name="tab-body">
    <xsl:param name="id" />
    <xsl:param name="tab-index" />
    <xsl:param name="body" />
    <xsl:variable name="tab-index" select="if (exists(../xx:tabset)) then () else (@tab-index, position())[1]" />
    <xf:group>
      <xsl:if test="exists($tab-index)">
        <xsl:attribute name="ref" select="concat('*[instance(''xxforms'')/tabs/', $id, '/tab-index = ', $tab-index, ']')" />
      </xsl:if>
      <div class="xx-tab-body">
        <xsl:apply-templates select="$body" />
      </div>
    </xf:group>
  </xsl:template>
  
  <!-- controls -->
  
  <xsl:template match="xx:tab-header">
    <xsl:variable name="id" select="xx:id(..)" />
    <xsl:variable name="tab-index" select="(@tab-index, position())[1]" />
    <xsl:call-template name="tab-header">
      <xsl:with-param name="id" select="$id" />
      <xsl:with-param name="tab-index" select="$tab-index" />
      <xsl:with-param name="tab-index-to-set" select="$tab-index" />
      <xsl:with-param name="title" select="node()" />
    </xsl:call-template>
  </xsl:template>
  
  <xsl:template match="xx:tab-body">
    <xsl:variable name="id" select="xx:id(..)" />
    <xsl:call-template name="tab-body">
      <xsl:with-param name="id" select="$id" />
      <xsl:with-param name="tab-index" select="(@tab-index, position())[1]" />
      <xsl:with-param name="body" select="node()" />
    </xsl:call-template>
  </xsl:template>
  
  <xsl:template match="xx:tabset">
    <xsl:variable name="id" select="xx:id(..)" />
    <div class="xx-tab-headers">
      <xf:repeat ref="{@ref}" id="{$id}-tabset-header">
        <xsl:call-template name="tab-header">
          <xsl:with-param name="id" select="$id" />
          <xsl:with-param name="tab-index" select="@tab-index" />
          <xsl:with-param name="tab-index-to-set" select="concat(@ref, '[index(''', $id, '-tabset-header'')]/', @tab-index)" />
          <xsl:with-param name="title">
            <xf:output ref="." />
          </xsl:with-param>
        </xsl:call-template>
      </xf:repeat>
    </div>
    <xsl:apply-templates select="xx:tab-body" />
  </xsl:template>
  
  <xsl:template match="xx:tabs">
    <xsl:variable name="id" select="xx:id(.)" />
    <xsl:variable name="class">
      <xsl:text>xx-tabs</xsl:text>
      <xsl:if test="@full-header = 'true'">
        <xsl:text> xx-full-header</xsl:text>
      </xsl:if>
    </xsl:variable>
    <div class="{$class}" data-xx_id="{$id}">
      <xsl:choose>
        <xsl:when test="xx:tabset">
          <xsl:apply-templates select="xx:tabset" />
          <xsl:apply-templates select="xx:tab-body" />
        </xsl:when>
        <xsl:otherwise>
          <div class="xx-tab-headers">
            <xsl:apply-templates select="xx:tab-header" />
          </div>
          <xsl:apply-templates select="xx:tab-body" />
        </xsl:otherwise>
      </xsl:choose>
    </div>
  </xsl:template>
 
</xsl:stylesheet>