<xsl:stylesheet
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xx='http://www.xxforms.org/2025/xxforms'
  xmlns:xh='http://www.w3.org/1999/xhtml'
  xmlns:xf='http://www.w3.org/2002/xforms'
  xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xsl='http://www.w3.org/1999/XSL/Transform'
  version='2.0' exclude-result-prefixes='xh xsl xs xx'>

  <!-- model -->

  <xsl:template match="/" mode="head" priority="10">
    <xsl:if test="exists(//xx:icon[@fa])">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </xsl:if>
    <xsl:if test="exists(//xx:icon[@bi])">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    </xsl:if>
    <xsl:if test="exists(//xx:icon[@mdi])">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
    </xsl:if>
    <xsl:next-match />
  </xsl:template>
  
  <!-- controls -->
  
  <xsl:template match="xx:icon">
    <xsl:variable name="names">
      <xsl:choose>
        <xsl:when test="exists(@fa)">
          <name>i</name>
          <class><xsl:value-of select="concat('concat(''fa-solid fa-'', ', @fa, ')')"/></class>
        </xsl:when>
        <xsl:when test="exists(@bi)">
          <name>i</name>
          <class><xsl:value-of select="concat('concat(''bi bi-'',', @bi, ')')"/></class>
        </xsl:when>
        <xsl:when test="exists(@mdi)">
          <name>span</name>
          <class>'material-symbols-outlined'</class>
          <content><xsl:value-of select="@mdi"/></content>
        </xsl:when>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="base-class">
      <xsl:text>xx-icon </xsl:text>
      <xsl:if test="exists(@style)">
        <xsl:variable name="style">
          <xsl:variable name="styles" select="tokenize(@style, ' ')"/>
          <xsl:for-each select="$styles">
            <style>
              <xsl:value-of select="concat('xx-', ., ' ')"/>
            </style>
          </xsl:for-each>
        </xsl:variable>
        <xsl:value-of select="$style"/>
      </xsl:if>
    </xsl:variable>
    <xsl:element namespace="http://www.w3.org/1999/xhtml" name="{$names/name}">
      <xsl:attribute name="class" select="concat('{concat(''', $base-class, ''', ', $names/class, ')}')" />
      <xsl:if test="exists($names/content)">
        <xf:output>
          <xsl:attribute name="value" select="$names/content" />
        </xf:output>
      </xsl:if>
    </xsl:element>
  </xsl:template>
 
</xsl:stylesheet>