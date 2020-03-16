class TextBuilder {

    eol = "\r\n"
    text = ""

    ln(text) {
        this.text += (text ? text : '') + this.eol;
        return this
    }

    ap(text) {
        this.text += text;
        return this
    }

    /**
     * 
     * @param {any[]} values 
     * @param {string} comma 
     */
    csv(values, comma = ',') {
        let text = '';
        for (let i = 0; i < values.length; i++) {
            text += values[i];
            if (i < values.length - 1) text += comma
        }
        this.ap(text)
        return this
    }

    getText() {
        return this.text
    }
}

/**
 * 
 * @param {string} sql 
 * @param {{column:string, header:string, format:string}[]} entries
 */
export function generateRpt(sql, entries = []) {

    sql = sql.replace(/'/g, '\'')

    let b = new TextBuilder();

    b.ln("// Parametros de linea de comando")
    b.ln("gServidor   = @parametroConsola('Servidor')")
    b.ln("gInstancia  = @parametroConsola('Instancia')")
    b.ln("gUsuarioSQL = @parametroConsola('NombreUsuario')")
    b.ln("gClaveSQL   = @parametroConsola('Clave')")
    b.ln("pQueTipo    = @parametroConsola('QueTipo')")
    b.ln();

    b.ln("// Conexión")
    b.ln("Conexion tEmpresa = Conexion.crear('jdbc:jtds:sqlserver:' & gServidor & ';instance=' & gInstancia,gUsuarioSQL,gClaveSQL)")
    b.ln();

    // TODO
    // b.ln("// Parametros")
    // b.ln("Incluye LibParametros.rpt")
    // b.ln("Parametros")
    // b.ln("FinParametros")
    // b.ln()

    let lines = sql.trim().replace(/\r/g, "").split('\n');
    b.ln("// SQL del reporte (" + lines.length + ")")
    b.ln("sql = ''")
    //for (let line of lines)
    for (let i = 0; i < lines.length; i++) {
        // line jump as space (a lo mejor debería ser configurable)
        let line = lines[i]
        let sqlLineEndingCharacter = ''
        if (!line.endsWith(" "))
            sqlLineEndingCharacter = i === lines.length - 1 ? '' : ' ';
        b.ln("sql = sql & '" + line + sqlLineEndingCharacter + "'")
    }
    b.ln()

    if (entries && entries.length) {
        b.ln('// Salida y columnas')
        b.ln('Consulta tConsulta = tEmpresa[sql]')
        b.ap('Columnas ' + entries.length + ';').csv(entries.map(e => 5)).ln()
        b.ap('Lista ').csv(entries.map(e => "'" + e.column + "'")).ln()
        b.ln('Mientras tConsulta->Encontro')
        b.ap('    Lista ').csv(entries.map(e => e.column).map(e => "tConsulta('" + e + "')")).ln()
        b.ln('    tConsulta.Busca Siguiente')
        b.ln('FinMientras')
        b.ln()
    }

    return b.getText();
}

