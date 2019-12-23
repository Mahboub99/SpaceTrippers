#version 300 es
precision highp float;

in vec4 v_color;
in vec3 v_view;
in vec3 v_normal;

out vec4 color;

uniform samplerCube cube_texture_sampler; // samplerCube is the type of samplers that read from cubes
uniform vec4 tint;

uniform bool refraction; // if false, do reflection, if true, do refraction.
uniform float refractive_index;

void main(){
    vec3 direction;
    if(refraction){
        direction = refract(v_view, normalize(v_normal), refractive_index);
    } else {
        direction = reflect(v_view, normalize(v_normal));    
    }
    // Note that cube samplers take a direction (vec3) not a texture coordinate (vec2)
    color = texture(cube_texture_sampler, direction) * v_color * tint;
}